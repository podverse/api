import { Request, Response } from 'express';
import { QueueResourceItemChapterService } from '@orm/services/queue/queueResourceItemChapter';
import { handleGenericErrorResponse } from '@api/controllers/helpers/error';
import { ensureAuthenticated } from '@api/lib/auth';
import { verifyQueueOwnership } from '@api/controllers/queue';
import { validateBodyObject } from '@api/lib/validation';
import Joi from 'joi';

const addItemChapterToQueueBetweenSchema = Joi.object({
  position1: Joi.number().min(0).required(),
  position2: Joi.number().min(Joi.ref('position1')).required()
}).with('position1', 'position2');

class QueueResourceItemChapterController {
  private static queueResourceItemChapterService = new QueueResourceItemChapterService();

  static async addItemChapterToQueueNext(req: Request, res: Response): Promise<void> {
    ensureAuthenticated(req, res, async () => {
      verifyQueueOwnership()(req, res, async () => {
        const { queue_id_text, item_chapter_id_text } = req.params;

        try {
          const queueResourceItemChapter = await QueueResourceItemChapterController.queueResourceItemChapterService.addItemChapterToQueueNext(queue_id_text, item_chapter_id_text);
          res.status(201).json(queueResourceItemChapter);
        } catch (err) {
          handleGenericErrorResponse(res, err);
        }
      });
    });
  }

  static async addItemChapterToQueueLast(req: Request, res: Response): Promise<void> {
    ensureAuthenticated(req, res, async () => {
      verifyQueueOwnership()(req, res, async () => {
        const { queue_id_text, item_chapter_id_text } = req.params;

        try {
          const queueResourceItemChapter = await QueueResourceItemChapterController.queueResourceItemChapterService.addItemChapterToQueueLast(queue_id_text, item_chapter_id_text);
          res.status(201).json(queueResourceItemChapter);
        } catch (err) {
          handleGenericErrorResponse(res, err);
        }
      });
    });
  }

  static async addItemChapterToQueueBetween(req: Request, res: Response): Promise<void> {
    ensureAuthenticated(req, res, async () => {
      validateBodyObject(addItemChapterToQueueBetweenSchema, req, res, async () => {
        verifyQueueOwnership()(req, res, async () => {
          const { queue_id_text, item_chapter_id_text } = req.params;
          const { position1, position2 } = req.body;

          try {
            const queueResourceItemChapter = await QueueResourceItemChapterController.queueResourceItemChapterService.addItemChapterToQueueBetween(queue_id_text, item_chapter_id_text, position1, position2);
            res.status(201).json(queueResourceItemChapter);
          } catch (err) {
            handleGenericErrorResponse(res, err);
          }
        });
      });
    });
  }

  static async addItemChapterToNowPlaying(req: Request, res: Response): Promise<void> {
    ensureAuthenticated(req, res, async () => {
      verifyQueueOwnership()(req, res, async () => {
        const { queue_id_text, item_chapter_id_text } = req.params;

        try {
          const queueResourceItemChapter = await QueueResourceItemChapterController.queueResourceItemChapterService.addItemChapterToNowPlaying(queue_id_text, item_chapter_id_text);
          res.status(201).json(queueResourceItemChapter);
        } catch (err) {
          handleGenericErrorResponse(res, err);
        }
      });
    });
  }

  static async addItemChapterToHistory(req: Request, res: Response): Promise<void> {
    ensureAuthenticated(req, res, async () => {
      verifyQueueOwnership()(req, res, async () => {
        const { queue_id_text, item_chapter_id_text } = req.params;

        try {
          const queueResourceItemChapter = await QueueResourceItemChapterController.queueResourceItemChapterService.addItemChapterToHistory(queue_id_text, item_chapter_id_text);
          res.status(201).json(queueResourceItemChapter);
        } catch (err) {
          handleGenericErrorResponse(res, err);
        }
      });
    });
  }

  static async removeItemChapterFromQueue(req: Request, res: Response): Promise<void> {
    ensureAuthenticated(req, res, async () => {
      verifyQueueOwnership()(req, res, async () => {
        const { queue_id_text, item_chapter_id_text } = req.params;

        try {
          await QueueResourceItemChapterController.queueResourceItemChapterService.removeItemChapterFromQueue(queue_id_text, item_chapter_id_text);
          res.status(204).end();
        } catch (err) {
          handleGenericErrorResponse(res, err);
        }
      });
    });
  }
}

export { QueueResourceItemChapterController };