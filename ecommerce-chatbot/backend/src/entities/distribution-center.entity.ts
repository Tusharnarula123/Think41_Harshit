import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity('distribution_centers')
export class DistributionCenter {
  @PrimaryColumn()
  id: number;

  @Column()
  name: string;

  @Column({ type: 'float' })
  latitude: number;

  @Column({ type: 'float' })
  longitude: number;
}