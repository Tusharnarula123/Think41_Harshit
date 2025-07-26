
import { Entity, Column, PrimaryColumn, ManyToOne } from 'typeorm';
import { Order } from './order.entity';
import { Product } from './product.entity';
import { InventoryItem } from './inventory-item.entity';

@Entity('order_items')
export class OrderItem {
  @PrimaryColumn()
  id: number;

  @ManyToOne(() => Order, (order) => order.order_id)
  order_id: number;

  @Column()
  user_id: number;

  @ManyToOne(() => Product, (product) => product.id)
  product_id: number;

  @ManyToOne(() => InventoryItem, (item) => item.id)
  inventory_item_id: number;

  @Column()
  status: string;

  @Column({ type: 'timestamp' })
  created_at: Date;

  @Column({ type: 'timestamp', nullable: true })
  shipped_at: Date;

  @Column({ type: 'timestamp', nullable: true })
  delivered_at: Date;

  @Column({ type: 'timestamp', nullable: true })
  returned_at: Date;
}
