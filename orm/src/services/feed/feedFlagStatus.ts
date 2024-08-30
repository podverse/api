import { AppDataSource } from '@orm/db';
import { FeedFlagStatus } from '@orm/entities/feed/feedFlagStatus';

export class FeedFlagStatusService {
  private repository = AppDataSource.getRepository(FeedFlagStatus);

  async get(id: number): Promise<FeedFlagStatus | null> {
    return await this.repository.findOne({
      where: { id },
    });
  }
}