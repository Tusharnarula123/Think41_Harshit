import { User } from './user.entity';
export declare class Conversation {
    id: number;
    user: User;
    session_id: string;
    messages: {
        query: string;
        response: string;
        timestamp: Date;
    }[];
    created_at: Date;
}
