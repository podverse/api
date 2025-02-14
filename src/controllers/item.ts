import { Request, Response } from 'express';
import { Channel, ItemService } from 'podverse-orm';
import { fetchChannel } from '@api/controllers/helpers/channel';
import { handleReturnDataOrNotFound } from '@api/controllers/helpers/data';
import { handleInternalError } from '@api/controllers/helpers/error';
import { getPaginationParams } from '@api/controllers/helpers/pagination';

const itemService = new ItemService();

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

async function fetchItems(serviceMethod: Function, req: Request, res: Response, channel?: Channel) {
  try {
    const { page, limit, offset } = getPaginationParams(req);
    const items = channel
      ? await serviceMethod(channel, { skip: offset, take: limit, relations: allRelations })
      : await serviceMethod({ skip: offset, take: limit, relations: allRelations });
    res.json({
      data: items,
      meta: { page }
    });
  } catch (error) {
    handleInternalError(res, error);
  }
}

export class ItemController {
  static async getByIdOrIdText(req: Request, res: Response): Promise<void> {
    const { idOrIdText } = req.params;
    const config = { relations: allRelations };
    try {
      const data = await itemService.getByIdOrIdText(idOrIdText, config);
      handleReturnDataOrNotFound(res, data, 'Item');
    } catch (error) {
      handleInternalError(res, error);
    }
  }

  static async getMany(req: Request, res: Response): Promise<void> {
    await fetchItems(itemService.getMany.bind(itemService), req, res);
  }

  static async getManyByChannel(req: Request, res: Response): Promise<void> {
    const { channelIdOrIdText } = req.params;
    const channel = await fetchChannel(channelIdOrIdText, res);
    if (channel) {
      await fetchItems(itemService.getManyByChannel.bind(itemService), req, res, channel);
    }
  }

  static async getManyWithLiveItemByChannel(req: Request, res: Response): Promise<void> {
    const { channelIdOrIdText } = req.params;
    const channel = await fetchChannel(channelIdOrIdText, res);
    if (channel) {
      await fetchItems(itemService.getManyWithLiveItemByChannel.bind(itemService), req, res, channel);
    }
  }
}
