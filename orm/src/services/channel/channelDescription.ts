import { Channel } from '@orm/entities/channel/channel';
import { ChannelDescription } from '@orm/entities/channel/channelDescription';
import { BaseOneService } from '@orm/services/base/baseOneService';

type ChannelDescriptionDto = {
  value: string
}

export class ChannelDescriptionService extends BaseOneService<ChannelDescription, 'channel'> {
  constructor() {
    super(ChannelDescription, 'channel');
  }

  async update(channel: Channel, dto: ChannelDescriptionDto): Promise<ChannelDescription> {
    return super._update(channel, dto);
  }
}