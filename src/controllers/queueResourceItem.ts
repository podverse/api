import { Request, Response } from 'express';
import Joi from 'joi';
import { QueueResourceItemService } from 'podverse-orm';
import { handleGenericErrorResponse } from '@api/controllers/helpers/error';
import { ensureAuthenticated } from '@api/lib/auth';
import { verifyQueueOwnership } from '@api/controllers/queue';
import { validateBodyObject } from '@api/lib/validation';

const addItemToQueueBetweenSchema = Joi.object({
  position1: Joi.number().min(0).required(),
  position2: Joi.number().min(Joi.ref('position1')).required()
}).with('position1', 'position2');

class QueueResourceItemController {
  private static queueResourceItemService = new QueueResourceItemService();

  static async addItemToNowPlaying(req: Request, res: Response): Promise<void> {
    ensureAuthenticated(req, res, async () => {
      verifyQueueOwnership()(req, res, async () => {
        const { queue_id_text, item_id_text } = req.params;

        try {
          const queueResourceItem = await QueueResourceItemController.queueResourceItemService.addItemToNowPlaying(queue_id_text, item_id_text);
          res.status(201).json(queueResourceItem);
        } catch (err) {
          handleGenericErrorResponse(res, err);
        }
      });
    });
  }

  static async addItemToQueueNext(req: Request, res: Response): Promise<void> {
    ensureAuthenticated(req, res, async () => {
      verifyQueueOwnership()(req, res, async () => {
        const { queue_id_text, item_id_text } = req.params;

        try {
          const queueResourceItem = await QueueResourceItemController.queueResourceItemService.addItemToQueueNext(queue_id_text, item_id_text);
          res.status(201).json(queueResourceItem);
        } catch (err) {
          handleGenericErrorResponse(res, err);
        }
      });
    });
  }

  static async addItemToQueueLast(req: Request, res: Response): Promise<void> {
    ensureAuthenticated(req, res, async () => {
      verifyQueueOwnership()(req, res, async () => {
        const { queue_id_text, item_id_text } = req.params;

        try {
          const queueResourceItem = await QueueResourceItemController.queueResourceItemService.addItemToQueueLast(queue_id_text, item_id_text);
          res.status(201).json(queueResourceItem);
        } catch (err) {
          handleGenericErrorResponse(res, err);
        }
      });
    });
  }

  static async addItemToQueueBetween(req: Request, res: Response): Promise<void> {
    ensureAuthenticated(req, res, async () => {
      validateBodyObject(addItemToQueueBetweenSchema, req, res, async () => {
        verifyQueueOwnership()(req, res, async () => {
          const { queue_id_text, item_id_text } = req.params;
          const { position1, position2 } = req.body;

          try {
            const queueResourceItem = await QueueResourceItemController.queueResourceItemService.addItemToQueueBetween(queue_id_text, item_id_text, position1, position2);
            res.status(201).json(queueResourceItem);
          } catch (err) {
            handleGenericErrorResponse(res, err);
          }
        });
      });
    });
  }

  static async addItemToHistory(req: Request, res: Response): Promise<void> {
    ensureAuthenticated(req, res, async () => {
      verifyQueueOwnership()(req, res, async () => {
        const { queue_id_text, item_id_text } = req.params;

        try {
          const queueResourceItem = await QueueResourceItemController.queueResourceItemService.addItemToHistory(queue_id_text, item_id_text);
          res.status(201).json(queueResourceItem);
        } catch (err) {
          handleGenericErrorResponse(res, err);
        }
      });
    });
  }

  static async removeItemFromQueue(req: Request, res: Response): Promise<void> {
    ensureAuthenticated(req, res, async () => {
      verifyQueueOwnership()(req, res, async () => {
        const { queue_id_text, item_id_text } = req.params;

        try {
          await QueueResourceItemController.queueResourceItemService.removeItemFromQueue(queue_id_text, item_id_text);
          res.status(204).end();
        } catch (err) {
          handleGenericErrorResponse(res, err);
        }
      });
    });
  }
}

export { QueueResourceItemController };