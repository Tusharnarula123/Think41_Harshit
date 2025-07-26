
import { Entity, Column, PrimaryColumn, OneToMany } from 'typeorm';
import { InventoryItem } from './inventory-item.entity';

@Entity('products')
export class Product {
  @PrimaryColumn()
  id: number;

  @Column({ type: 'float' })
  cost: number;

  @Column()
  category: string;

  @Column()
  name: string;

  @Column()
  brand: string;

  @Column({ type: 'float' })
  retail_price: number;

  @Column()
  department: string;

  @Column()
  sku: string;

  @Column()
  distribution_center_id: number;

  @OneToMany(() => InventoryItem, (item) => item.product_id)
  inventoryItems: InventoryItem[];
}
