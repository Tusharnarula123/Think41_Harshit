
import { Entity, Column, PrimaryColumn, ManyToOne } from 'typeorm';
import { Product } from './product.entity';

@Entity('inventory_items')
export class InventoryItem {
  @PrimaryColumn()
  id: number;

  @ManyToOne(() => Product, (product) => product.id)
  product_id: number;

  @Column({ type: 'timestamp' })
  created_at: Date;

  @Column({ type: 'timestamp', nullable: true })
  sold_at: Date;

  @Column({ type: 'float' })
  cost: number;

  @Column()
  product_category: string;

  @Column()
  product_name: string;

  @Column()
  product_brand: string;

  @Column({ type: 'float' })
  product_retail_price: number;

  @Column()
  product_department: string;

  @Column()
  product_sku: string;

  @Column()
  product_distribution_center_id: number;
}
