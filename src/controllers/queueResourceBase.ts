import { Request, Response } from 'express';
import { QueueResourceBaseService } from 'podverse-orm';
import { handleGenericErrorResponse } from './helpers/error';
import { ensureAuthenticated } from '@api/lib/auth';
import { verifyQueueOwnership } from '@api/controllers/queue';

class QueueResourceBaseController {
  private static queueResourceBaseService = new QueueResourceBaseService();

  static async getAllByQueueIdPrivate(req: Request, res: Response): Promise<void> {
    ensureAuthenticated(req, res, async () => {
      verifyQueueOwnership()(req, res, async () => {
        const { queue_id } = req.params;

        try {
          const queueResources = await QueueResourceBaseController.queueResourceBaseService.getAllByQueueId(queue_id);
          res.status(200).json(queueResources);
        } catch (err) {
          handleGenericErrorResponse(res, err);
        }
      });
    });
  }
}

export { QueueResourceBaseController };