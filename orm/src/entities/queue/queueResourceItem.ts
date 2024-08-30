import { Entity, JoinColumn, ManyToOne, Unique } from "typeorm";
import { Item } from "@orm/entities/item/item";
import { QueueResourceBase } from "@orm/entities/queue/queueResourceBase";

@Entity()
@Unique(['queue'])
export class QueueResourceItem extends QueueResourceBase {
  @ManyToOne(() => Item, item => item.id, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'item_id' })
  item!: Item;
}