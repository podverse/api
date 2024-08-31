import { Channel } from '@orm/entities/channel/channel';
import { ChannelChat } from '@orm/entities/channel/channelChat';
import { BaseOneService } from '@orm/services/base/baseOneService';

type ChannelChatDto = {
  server: string
  protocol: string
  account_id: string | null
  space: string | null
}

export class ChannelChatService extends BaseOneService<ChannelChat, 'channel'> {
  constructor() {
    super(ChannelChat, 'channel');
  }

  async update(channel: Channel, dto: ChannelChatDto): Promise<ChannelChat> {
    return super._update(channel, dto);
  }
}
