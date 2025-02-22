import { Request, Response } from 'express';
import Joi from 'joi';
import { FeedService } from 'podverse-orm';
import { validateBodyObject } from '@api/lib/validation';

const createFeedSchema = Joi.object({
  url: Joi.string().uri().required(),
  podcast_index_id: Joi.number().required()
});

export class FeedController {
  private static feedService = new FeedService();

  static async create(req: Request, res: Response): Promise<void> {
    validateBodyObject(createFeedSchema, req, res, async () => {
      const { url, podcast_index_id } = req.body;
      const result = await FeedController.feedService.create({ url, podcast_index_id });
      res.json(result);
    });
  }
}