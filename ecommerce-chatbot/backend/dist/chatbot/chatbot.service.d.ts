import { Repository } from 'typeorm';
import { Conversation } from '../entities/conversation.entity';
import { InventoryItem } from '../entities/inventory-item.entity';
import { Order } from '../entities/order.entity';
import { OrderItem } from '../entities/order-item.entity';
import { Product } from '../entities/product.entity';
export declare class ChatbotService {
    private conversationRepository;
    private inventoryItemRepository;
    private orderRepository;
    private orderItemRepository;
    private productRepository;
    private readonly llmApiUrl;
    private readonly llmApiKey;
    constructor(conversationRepository: Repository<Conversation>, inventoryItemRepository: Repository<InventoryItem>, orderRepository: Repository<Order>, orderItemRepository: Repository<OrderItem>, productRepository: Repository<Product>);
    processMessage(userId: number, message: string): Promise<string>;
    private saveConversation;
    getConversationHistory(userId: number, sessionId: string): Promise<Conversation>;
    getConversationCount(): Promise<number>;
}
