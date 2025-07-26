
import { Entity, Column, PrimaryColumn, OneToMany } from 'typeorm';
import { Conversation } from './conversation.entity';

@Entity('users')
export class User {
  @PrimaryColumn()
  id: number;

  @Column()
  first_name: string;

  @Column()
  last_name: string;

  @Column()
  email: string;

  @Column()
  age: number;

  @Column()
  gender: string;

  @Column()
  state: string;

  @Column()
  street_address: string;

  @Column()
  postal_code: string;

  @Column()
  city: string;

  @Column()
  country: string;

  @Column({ type: 'float' })
  latitude: number;

  @Column({ type: 'float' })
  longitude: number;

  @Column()
  traffic_source: string;

  @Column({ type: 'timestamp' })
  created_at: Date;

  @OneToMany(() => Conversation, (conversation) => conversation.user)
  conversations: Conversation[];
}
