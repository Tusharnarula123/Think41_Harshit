
import { Entity, Column, PrimaryColumn, OneToMany } from 'typeorm';
import { OrderItem } from './order-item.entity';

@Entity('orders')
export class Order {
  @PrimaryColumn()
  order_id: number;

  @Column()
  user_id: number;

  @Column()
  status: string;

  @Column()
  gender: string;

  @Column({ type: 'timestamp' })
  created_at: Date;

  @Column({ type: 'timestamp', nullable: true })
  returned_at: Date;

  @Column({ type: 'timestamp', nullable: true })
  shipped_at: Date;

  @Column({ type: 'timestamp', nullable: true })
  delivered_at: Date;

  @Column()
  num_of_item: number;

  @OneToMany(() => OrderItem, (orderItem) => orderItem.order_id)
  orderItems: OrderItem[];
}
