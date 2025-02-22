import { Request, Response } from 'express';
import Joi from 'joi';
import { QueueResourceClipService } from 'podverse-orm';
import { handleGenericErrorResponse } from '@api/controllers/helpers/error';
import { ensureAuthenticated } from '@api/lib/auth';
import { verifyQueueOwnership } from '@api/controllers/queue';
import { validateBodyObject } from '@api/lib/validation';

const addClipToQueueBetweenSchema = Joi.object({
  position1: Joi.number().min(0).required(),
  position2: Joi.number().min(Joi.ref('position1')).required()
}).with('position1', 'position2');

class QueueResourceClipController {
  private static queueResourceClipService = new QueueResourceClipService();

  static async addClipToQueueNext(req: Request, res: Response): Promise<void> {
    ensureAuthenticated(req, res, async () => {
      verifyQueueOwnership()(req, res, async () => {
        const { queue_id_text, clip_id_text } = req.params;

        try {
          const queueResourceClip = await QueueResourceClipController.queueResourceClipService.addClipToQueueNext(queue_id_text, clip_id_text);
          res.status(201).json(queueResourceClip);
        } catch (err) {
          handleGenericErrorResponse(res, err);
        }
      });
    });
  }

  static async addClipToQueueLast(req: Request, res: Response): Promise<void> {
    ensureAuthenticated(req, res, async () => {
      verifyQueueOwnership()(req, res, async () => {
        const { queue_id_text, clip_id_text } = req.params;

        try {
          const queueResourceClip = await QueueResourceClipController.queueResourceClipService.addClipToQueueLast(queue_id_text, clip_id_text);
          res.status(201).json(queueResourceClip);
        } catch (err) {
          handleGenericErrorResponse(res, err);
        }
      });
    });
  }

  static async addClipToQueueBetween(req: Request, res: Response): Promise<void> {
    ensureAuthenticated(req, res, async () => {
      validateBodyObject(addClipToQueueBetweenSchema, req, res, async () => {
        verifyQueueOwnership()(req, res, async () => {
          const { queue_id_text, clip_id_text } = req.params;
          const { position1, position2 } = req.body;

          try {
            const queueResourceClip = await QueueResourceClipController.queueResourceClipService.addClipToQueueBetween(queue_id_text, clip_id_text, position1, position2);
            res.status(201).json(queueResourceClip);
          } catch (err) {
            handleGenericErrorResponse(res, err);
          }
        });
      });
    });
  }

  static async addClipToNowPlaying(req: Request, res: Response): Promise<void> {
    ensureAuthenticated(req, res, async () => {
      verifyQueueOwnership()(req, res, async () => {
        const { queue_id_text, clip_id_text } = req.params;

        try {
          const queueResourceClip = await QueueResourceClipController.queueResourceClipService.addClipToNowPlaying(queue_id_text, clip_id_text);
          res.status(201).json(queueResourceClip);
        } catch (err) {
          handleGenericErrorResponse(res, err);
        }
      });
    });
  }

  static async addClipToHistory(req: Request, res: Response): Promise<void> {
    ensureAuthenticated(req, res, async () => {
      verifyQueueOwnership()(req, res, async () => {
        const { queue_id_text, clip_id_text } = req.params;

        try {
          const queueResourceClip = await QueueResourceClipController.queueResourceClipService.addClipToHistory(queue_id_text, clip_id_text);
          res.status(201).json(queueResourceClip);
        } catch (err) {
          handleGenericErrorResponse(res, err);
        }
      });
    });
  }

  static async removeClipFromQueue(req: Request, res: Response): Promise<void> {
    ensureAuthenticated(req, res, async () => {
      verifyQueueOwnership()(req, res, async () => {
        const { queue_id_text, clip_id_text } = req.params;

        try {
          await QueueResourceClipController.queueResourceClipService.removeClipFromQueue(queue_id_text, clip_id_text);
          res.status(204).end();
        } catch (err) {
          handleGenericErrorResponse(res, err);
        }
      });
    });
  }
}

export { QueueResourceClipController };