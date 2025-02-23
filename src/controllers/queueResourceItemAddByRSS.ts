import { Request, Response } from 'express';
import Joi from 'joi';
import { QueueResourceService } from 'podverse-orm';
import { handleGenericErrorResponse } from '@api/controllers/helpers/error';
import { ensureAuthenticated } from '@api/lib/auth';
import { verifyQueueOwnership } from '@api/controllers/queue';
import { validateBodyObject } from '@api/lib/validation';

const addItemToQueueSchema = Joi.object({
  add_by_rss_resource_data: Joi.object().required()
});

const addItemToQueueBetweenSchema = Joi.object({
  add_by_rss_resource_data: Joi.object().required(),
  position1: Joi.number().min(0).required(),
  position2: Joi.number().min(Joi.ref('position1')).required()
}).with('position1', 'position2');

class QueueResourceItemAddByRSSController {
  private static queueResourceService = new QueueResourceService();

  static async addItemAddByRSSToQueueNext(req: Request, res: Response): Promise<void> {
    ensureAuthenticated(req, res, async () => {
      verifyQueueOwnership()(req, res, async () => {
        validateBodyObject(addItemToQueueSchema, req, res, async () => {
          const { queue_id_text } = req.params;
          const { add_by_rss_resource_data } = req.body;
          try {
            const queueResource = await QueueResourceItemAddByRSSController.queueResourceService.addItemAddByRSSToQueueNext(queue_id_text, add_by_rss_resource_data);
            res.status(201).json(queueResource);
          } catch (err) {
            handleGenericErrorResponse(res, err);
          }
        });
      });
    });
  }

  static async addItemAddByRSSToQueueLast(req: Request, res: Response): Promise<void> {
    ensureAuthenticated(req, res, async () => {
      verifyQueueOwnership()(req, res, async () => {
        validateBodyObject(addItemToQueueSchema, req, res, async () => {
          const { queue_id_text } = req.params;
          const { add_by_rss_resource_data } = req.body;
          try {
            const queueResource = await QueueResourceItemAddByRSSController.queueResourceService.addItemAddByRSSToQueueLast(queue_id_text, add_by_rss_resource_data);
            res.status(201).json(queueResource);
          } catch (err) {
            handleGenericErrorResponse(res, err);
          }
        });
      });
    });
  }

  static async addItemAddByRSSToQueueBetween(req: Request, res: Response): Promise<void> {
    ensureAuthenticated(req, res, async () => {
      verifyQueueOwnership()(req, res, async () => {
        validateBodyObject(addItemToQueueBetweenSchema, req, res, async () => {
          const { queue_id_text } = req.params;
          const { add_by_rss_resource_data, position1, position2 } = req.body;
          try {
            const queueResource = await QueueResourceItemAddByRSSController.queueResourceService.addItemAddByRSSToQueueBetween(queue_id_text, add_by_rss_resource_data, position1, position2);
            res.status(201).json(queueResource);
          } catch (err) {
            handleGenericErrorResponse(res, err);
          }
        });
      });
    });
  }

  static async addItemAddByRSSToNowPlaying(req: Request, res: Response): Promise<void> {
    ensureAuthenticated(req, res, async () => {
      verifyQueueOwnership()(req, res, async () => {
        validateBodyObject(addItemToQueueSchema, req, res, async () => {
          const { queue_id_text } = req.params;
          const { add_by_rss_resource_data } = req.body;
          try {
            const queueResource = await QueueResourceItemAddByRSSController.queueResourceService.addItemAddByRSSToNowPlaying(queue_id_text, add_by_rss_resource_data);
            res.status(201).json(queueResource);
          } catch (err) {
            handleGenericErrorResponse(res, err);
          }
        });
      });
    });
  }

  static async addItemAddByRSSToHistory(req: Request, res: Response): Promise<void> {
    ensureAuthenticated(req, res, async () => {
      verifyQueueOwnership()(req, res, async () => {
        validateBodyObject(addItemToQueueSchema, req, res, async () => {
          const { queue_id_text } = req.params;
          const { add_by_rss_resource_data } = req.body;
          try {
            const queueResource = await QueueResourceItemAddByRSSController.queueResourceService.addItemAddByRSSToHistory(queue_id_text, add_by_rss_resource_data);
            res.status(201).json(queueResource);
          } catch (err) {
            handleGenericErrorResponse(res, err);
          }
        });
      });
    });
  }

  static async removeItemAddByRSSFromQueue(req: Request, res: Response): Promise<void> {
    ensureAuthenticated(req, res, async () => {
      verifyQueueOwnership()(req, res, async () => {
        const { queue_id_text, add_by_rss_hash_id } = req.params;
        try {
          await QueueResourceItemAddByRSSController.queueResourceService.removeItemAddByRSSFromQueue(queue_id_text, add_by_rss_hash_id);
          res.status(204).end();
        } catch (err) {
          handleGenericErrorResponse(res, err);
        }
      });
    });
  }
}

export { QueueResourceItemAddByRSSController };