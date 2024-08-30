import { Entity, ManyToOne, JoinColumn } from 'typeorm';
import { ItemChapter } from '@orm/entities/item/itemChapter';
import { PlaylistResourceBase } from '@orm/entities/playlist/playlistResourceBase';

@Entity()
export class PlaylistResourceItemChapter extends PlaylistResourceBase {
  @ManyToOne(() => ItemChapter, itemChapter => itemChapter.id, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'item_chapter_id' })
  item_chapter!: ItemChapter;
}