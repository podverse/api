import { Request, Response } from 'express';
import { QueueResourceService } from 'podverse-orm';
import { handleGenericErrorResponse } from '@api/controllers/helpers/error';
import { ensureAuthenticated } from '@api/lib/auth';
import { verifyQueueOwnership } from '@api/controllers/queue';
import { validateBodyObject } from '@api/lib/validation';
import Joi from 'joi';

const addItemSoundbiteToQueueBetweenSchema = Joi.object({
  position1: Joi.number().min(0).required(),
  position2: Joi.number().min(Joi.ref('position1')).required()
}).with('position1', 'position2');

class QueueResourceItemSoundbiteController {
  private static queueResourceService = new QueueResourceService();

  static async addItemSoundbiteToQueueNext(req: Request, res: Response): Promise<void> {
    ensureAuthenticated(req, res, async () => {
      verifyQueueOwnership()(req, res, async () => {
        const { queue_id_text, item_soundbite_id_text } = req.params;

        try {
          const queueResource = await QueueResourceItemSoundbiteController.queueResourceService.addItemSoundbiteToQueueNext(queue_id_text, item_soundbite_id_text);
          res.status(201).json(queueResource);
        } catch (err) {
          handleGenericErrorResponse(res, err);
        }
      });
    });
  }

  static async addItemSoundbiteToQueueLast(req: Request, res: Response): Promise<void> {
    ensureAuthenticated(req, res, async () => {
      verifyQueueOwnership()(req, res, async () => {
        const { queue_id_text, item_soundbite_id_text } = req.params;

        try {
          const queueResource = await QueueResourceItemSoundbiteController.queueResourceService.addItemSoundbiteToQueueLast(queue_id_text, item_soundbite_id_text);
          res.status(201).json(queueResource);
        } catch (err) {
          handleGenericErrorResponse(res, err);
        }
      });
    });
  }

  static async addItemSoundbiteToQueueBetween(req: Request, res: Response): Promise<void> {
    ensureAuthenticated(req, res, async () => {
      validateBodyObject(addItemSoundbiteToQueueBetweenSchema, req, res, async () => {
        verifyQueueOwnership()(req, res, async () => {
          const { queue_id_text, item_soundbite_id_text } = req.params;
          const { position1, position2 } = req.body;

          try {
            const queueResource = await QueueResourceItemSoundbiteController.queueResourceService.addItemSoundbiteToQueueBetween(queue_id_text, item_soundbite_id_text, position1, position2);
            res.status(201).json(queueResource);
          } catch (err) {
            handleGenericErrorResponse(res, err);
          }
        });
      });
    });
  }

  static async addItemSoundbiteToNowPlaying(req: Request, res: Response): Promise<void> {
    ensureAuthenticated(req, res, async () => {
      verifyQueueOwnership()(req, res, async () => {
        const { queue_id_text, item_soundbite_id_text } = req.params;

        try {
          const queueResource = await QueueResourceItemSoundbiteController.queueResourceService.addItemSoundbiteToNowPlaying(queue_id_text, item_soundbite_id_text);
          res.status(201).json(queueResource);
        } catch (err) {
          handleGenericErrorResponse(res, err);
        }
      });
    });
  }

  static async addItemSoundbiteToHistory(req: Request, res: Response): Promise<void> {
    ensureAuthenticated(req, res, async () => {
      verifyQueueOwnership()(req, res, async () => {
        const { queue_id_text, item_soundbite_id_text } = req.params;

        try {
          const queueResource = await QueueResourceItemSoundbiteController.queueResourceService.addItemSoundbiteToHistory(queue_id_text, item_soundbite_id_text);
          res.status(201).json(queueResource);
        } catch (err) {
          handleGenericErrorResponse(res, err);
        }
      });
    });
  }

  static async removeItemSoundbiteFromQueue(req: Request, res: Response): Promise<void> {
    ensureAuthenticated(req, res, async () => {
      verifyQueueOwnership()(req, res, async () => {
        const { queue_id_text, item_soundbite_id_text } = req.params;

        try {
          await QueueResourceItemSoundbiteController.queueResourceService.removeItemSoundbiteFromQueue(queue_id_text, item_soundbite_id_text);
          res.status(204).end();
        } catch (err) {
          handleGenericErrorResponse(res, err);
        }
      });
    });
  }
}

export { QueueResourceItemSoundbiteController };