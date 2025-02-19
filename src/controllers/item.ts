import { Request, Response } from 'express';
import { Channel, ItemService, Item } from 'podverse-orm';
import { fetchChannel } from '@api/controllers/helpers/channel';
import { handleReturnDataOrNotFound } from '@api/controllers/helpers/data';
import { handleGenericErrorResponse } from '@api/controllers/helpers/error';
import { getPaginationParams } from '@api/controllers/helpers/pagination';

const allRelations = [
  'item_about',
  'item_about.item_itunes_episode_type',
  'item_chapters_feed',
  'item_chapters_feed.item_chapters',
  'item_chapters_feed.item_chapters_feed_log',
  'item_chat',
  'item_content_links',
  'item_description',
  'item_enclosures',
  'item_enclosures.item_enclosure_integrity',
  'item_enclosures.item_enclosure_sources',
  'item_fundings',
  'item_images',
  'item_license',
  'item_location',
  'item_persons',
  'item_season',
  'item_season.channel_season',
  'item_social_interacts',
  'item_soundbites',
  'item_transcripts',
  'item_txts',
  'item_values',
  'item_values.item_value_recipients',
  'item_values.item_value_time_splits',
  'item_values.item_value_time_splits.item_value_time_split_recipients',
  'item_values.item_value_time_splits.item_value_time_split_remote_item',
  'live_item'
];

export class ItemController {
  private static itemService = new ItemService();

  static async getByIdOrIdText(req: Request, res: Response): Promise<void> {
    const { idOrIdText } = req.params;
    const config = { relations: allRelations };
    try {
      const data = await ItemController.itemService.getByIdOrIdText(idOrIdText, config);
      handleReturnDataOrNotFound(res, data, 'Item');
    } catch (error) {
      handleGenericErrorResponse(res, error);
    }
  }

  static async getMany(req: Request, res: Response): Promise<void> {
    try {
      const { page, limit, offset } = getPaginationParams(req);
      const options = {
        skip: offset,
        take: limit,
        relations: allRelations
      };
      const items = await ItemController.itemService.getMany(options);
      res.json({
        data: items,
        meta: { page }
      });
    } catch (error) {
      handleGenericErrorResponse(res, error);
    }
  }

  static async getManyByChannel(req: Request, res: Response): Promise<void> {
    const { channelIdOrIdText } = req.params;
    try {
      const channel = await fetchChannel(channelIdOrIdText, res);
      if (channel) {
        const { page, limit, offset } = getPaginationParams(req);
        const options = {
          skip: offset,
          take: limit,
          relations: allRelations,
          where: { channel }
        };
        const items = await ItemController.itemService.getManyByChannel(channel, options);
        res.json({
          data: items,
          meta: { page }
        });
      }
    } catch (error) {
      handleGenericErrorResponse(res, error);
    }
  }

  static async getManyWithLiveItemByChannel(req: Request, res: Response): Promise<void> {
    const { channelIdOrIdText } = req.params;
    try {
      const channel = await fetchChannel(channelIdOrIdText, res);
      if (channel) {
        const { page, limit, offset } = getPaginationParams(req);
        const options = {
          skip: offset,
          take: limit,
          relations: allRelations
        };
        const items = await ItemController.itemService.getManyWithLiveItemByChannel(channel, options);
        res.json({
          data: items,
          meta: { page }
        });
      }
    } catch (error) {
      handleGenericErrorResponse(res, error);
    }
  }
}
