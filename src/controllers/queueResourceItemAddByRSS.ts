import { Request, Response } from 'express';
import Joi from 'joi';
import { QueueResourceItemAddByRSSService } from 'podverse-orm';
import { handleGenericErrorResponse } from '@api/controllers/helpers/error';
import { ensureAuthenticated } from '@api/lib/auth';
import { verifyQueueOwnership } from '@api/controllers/queue';
import { validateBodyObject } from '@api/lib/validation';

const addItemToQueueSchema = Joi.object({
  resource_data: Joi.object().required()
});

const addItemToQueueBetweenSchema = Joi.object({
  resource_data: Joi.object().required(),
  position1: Joi.number().min(0).required(),
  position2: Joi.number().min(Joi.ref('position1')).required()
}).with('position1', 'position2');

class QueueResourceItemAddByRSSController {
  private static queueResourceItemAddByRSSService = new QueueResourceItemAddByRSSService();

  static async addItemToQueueNext(req: Request, res: Response): Promise<void> {
    ensureAuthenticated(req, res, async () => {
      verifyQueueOwnership()(req, res, async () => {
        validateBodyObject(addItemToQueueSchema, req, res, async () => {
          const { queue_id_text } = req.params;
          const { resource_data } = req.body;

          try {
            const queueResourceItemAddByRSS = await QueueResourceItemAddByRSSController.queueResourceItemAddByRSSService.addItemToQueueNext(queue_id_text, resource_data);
            res.status(201).json(queueResourceItemAddByRSS);
          } catch (err) {
            handleGenericErrorResponse(res, err);
          }
        });
      });
    });
  }

  static async addItemToQueueLast(req: Request, res: Response): Promise<void> {
    ensureAuthenticated(req, res, async () => {
      verifyQueueOwnership()(req, res, async () => {
        validateBodyObject(addItemToQueueSchema, req, res, async () => {
          const { queue_id_text } = req.params;
          const { resource_data } = req.body;

          try {
            const queueResourceItemAddByRSS = await QueueResourceItemAddByRSSController.queueResourceItemAddByRSSService.addItemToQueueLast(queue_id_text, resource_data);
            res.status(201).json(queueResourceItemAddByRSS);
          } catch (err) {
            handleGenericErrorResponse(res, err);
          }
        });
      });
    });
  }

  static async addItemToQueueBetween(req: Request, res: Response): Promise<void> {
    ensureAuthenticated(req, res, async () => {
      verifyQueueOwnership()(req, res, async () => {
        validateBodyObject(addItemToQueueBetweenSchema, req, res, async () => {
          const { queue_id_text } = req.params;
          const { resource_data, position1, position2 } = req.body;

          try {
            const queueResourceItemAddByRSS = await QueueResourceItemAddByRSSController.queueResourceItemAddByRSSService.addItemToQueueBetween(queue_id_text, resource_data, position1, position2);
            res.status(201).json(queueResourceItemAddByRSS);
          } catch (err) {
            handleGenericErrorResponse(res, err);
          }
        });
      });
    });
  }

  static async addItemToNowPlaying(req: Request, res: Response): Promise<void> {
    ensureAuthenticated(req, res, async () => {
      verifyQueueOwnership()(req, res, async () => {
        validateBodyObject(addItemToQueueSchema, req, res, async () => {
          const { queue_id_text } = req.params;
          const { resource_data } = req.body;

          try {
            const queueResourceItemAddByRSS = await QueueResourceItemAddByRSSController.queueResourceItemAddByRSSService.addItemToNowPlaying(queue_id_text, resource_data);
            res.status(201).json(queueResourceItemAddByRSS);
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
        validateBodyObject(addItemToQueueSchema, req, res, async () => {
          const { queue_id_text } = req.params;
          const { resource_data } = req.body;

          try {
            const queueResourceItemAddByRSS = await QueueResourceItemAddByRSSController.queueResourceItemAddByRSSService.addItemToHistory(queue_id_text, resource_data);
            res.status(201).json(queueResourceItemAddByRSS);
          } catch (err) {
            handleGenericErrorResponse(res, err);
          }
        });
      });
    });
  }

  static async removeItemFromQueue(req: Request, res: Response): Promise<void> {
    ensureAuthenticated(req, res, async () => {
      verifyQueueOwnership()(req, res, async () => {
        const { queue_id_text } = req.params;
        const { resource_data } = req.body;

        try {
          await QueueResourceItemAddByRSSController.queueResourceItemAddByRSSService.removeItemFromQueue(queue_id_text, resource_data);
          res.status(204).end();
        } catch (err) {
          handleGenericErrorResponse(res, err);
        }
      });
    });
  }
}

export { QueueResourceItemAddByRSSController };