import { Request, Response } from 'express';
import { ChannelService } from 'podverse-orm';
import { handleReturnDataOrNotFound } from '@api/controllers/helpers/data';
import { handleGenericErrorResponse } from '@api/controllers/helpers/error';
import { getPaginationParams } from '@api/controllers/helpers/pagination';

const allRelations = [
  'channel_about',
  'channel_about.itunes_type',
  'channel_categories',
  'channel_categories.category',
  'channel_chat',
  'channel_description',
  'channel_fundings',
  'channel_images',
  'channel_internal_settings',
  'channel_license',
  'channel_location',
  'channel_persons',
  'channel_podroll',
  'channel_podroll.channel_podroll_remote_items',
  'channel_publisher',
  'channel_publisher.channel_publisher_remote_items',
  'channel_remote_items',
  'channel_seasons',
  'channel_social_interacts',
  'channel_trailers',
  'channel_txts',
  'channel_values',
  'channel_values.channel_value_recipients'
];

class ChannelController {
  private static channelService = new ChannelService();

  static async getByIdOrIdText(req: Request, res: Response): Promise<void> {
    try {
      const { idOrIdText } = req.params;
      const config = { relations: allRelations };
      const data = await ChannelController.channelService.getByIdOrIdText(idOrIdText, config);
      handleReturnDataOrNotFound(res, data, 'Channel');
    } catch (error) {
      handleGenericErrorResponse(res, error);
    }
  }

  static async getMany(req: Request, res: Response): Promise<void> {
    try {
      const { page, limit, offset } = getPaginationParams(req);
      const channels = await ChannelController.channelService.getMany({
        skip: offset,
        take: limit,
        relations: allRelations
      });

      res.json({
        data: channels,
        meta: {
          page
        }
      });
    } catch (error) {
      handleGenericErrorResponse(res, error);
    }
  }
}

export { ChannelController };
