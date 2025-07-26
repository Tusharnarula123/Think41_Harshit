import { OrderItem } from './order-item.entity';
export declare class Order {
    order_id: number;
    user_id: number;
    status: string;
    gender: string;
    created_at: Date;
    returned_at: Date;
    shipped_at: Date;
    delivered_at: Date;
    num_of_item: number;
    orderItems: OrderItem[];
}
