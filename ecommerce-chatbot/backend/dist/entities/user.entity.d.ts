import { Conversation } from './conversation.entity';
export declare class User {
    id: number;
    first_name: string;
    last_name: string;
    email: string;
    age: number;
    gender: string;
    state: string;
    street_address: string;
    postal_code: string;
    city: string;
    country: string;
    latitude: number;
    longitude: number;
    traffic_source: string;
    created_at: Date;
    conversations: Conversation[];
}
