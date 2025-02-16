import { Request, Response } from 'express';
import { FeedService } from 'podverse-orm';

export class FeedController {
  private static feedService = new FeedService();

  static async create(req: Request, res: Response): Promise<void> {
    const { url, podcast_index_id } = req.body;
    const result = await FeedController.feedService.create({ url, podcast_index_id });
    res.json(result);
  }
}
