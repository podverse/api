import { Response } from "express";
import { ChannelService } from "podverse-orm";

const channelService = new ChannelService();

export async function fetchChannel(idOrIdText: string, res: Response) {
  const channel = await channelService.getByIdOrTextId(idOrIdText);
  if (!channel) {
    res.status(404).json({ message: 'Channel not found' });
    return null;
  }
  return channel;
}
