import { Request, Response } from 'express';
import { QueueResourceService } from 'podverse-orm';
import { handleGenericErrorResponse } from './helpers/error';
import { ensureAuthenticated } from '@api/lib/auth';
import { verifyQueueOwnership } from '@api/controllers/queue';

class QueueResourceController {
  private static queueResourceService = new QueueResourceService();

  static async getAllByQueueIdPrivate(req: Request, res: Response): Promise<void> {
    ensureAuthenticated(req, res, async () => {
      verifyQueueOwnership()(req, res, async () => {
        const { queue_id } = req.params;

        try {
          const queueResources = await QueueResourceController.queueResourceService.getAllByQueueId(queue_id);
          res.status(200).json(queueResources);
        } catch (err) {
          handleGenericErrorResponse(res, err);
        }
      });
    });
  }
}

export { QueueResourceController };