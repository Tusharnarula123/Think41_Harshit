
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Conversation } from '../entities/conversation.entity';
import { InventoryItem } from '../entities/inventory-item.entity';
import { Order } from '../entities/order.entity';
import { OrderItem } from '../entities/order-item.entity';
import { Product } from '../entities/product.entity';
import { v4 as uuidv4 } from 'uuid';
import axios from 'axios';

@Injectable()
export class ChatbotService {
  private readonly llmApiUrl = 'https://api.x.ai/v1/chat'; // Placeholder LLM API URL
  private readonly llmApiKey = 'your-api-key-here'; // Replace with actual API key

  constructor(
    @InjectRepository(Conversation)
    private conversationRepository: Repository<Conversation>,
    @InjectRepository(InventoryItem)
    private inventoryItemRepository: Repository<InventoryItem>,
    @InjectRepository(Order)
    private orderRepository: Repository<Order>,
    @InjectRepository(OrderItem)
    private orderItemRepository: Repository<OrderItem>,
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
  ) {}

  async processMessage(userId: number, message: string): Promise<string> {
    const text = message.toLowerCase().trim();
    const sessionId = uuidv4();

    // Fallback to rule-based responses for specific queries
    if (text.includes('top 5') && text.includes('sold') && text.includes('products')) {
      const topProducts = await this.inventoryItemRepository
        .createQueryBuilder('ii')
        .select('p.name', 'name')
        .addSelect('COUNT(ii.id)', 'unitsSold')
        .innerJoin(Product, 'p', 'ii.product_id = p.id')
        .where('ii.sold_at IS NOT NULL')
        .groupBy('p.id, p.name')
        .orderBy('unitsSold', 'DESC')
        .limit(5)
        .getRawMany();

      if (!topProducts.length) return 'No sales data available.';
      const response = `Top 5 most sold products:\n${topProducts
        .map((p, i) => `${i + 1}. ${p.name} - ${p.unitsSold} units sold`)
        .join('\n')}`;
      await this.saveConversation(userId, sessionId, message, response);
      return response;
    }

    const orderIdMatch = text.match(/\d{5}/);
    if (text.includes('order status') && orderIdMatch) {
      const orderId = parseInt(orderIdMatch[0], 10);
      const order = await this.orderRepository
        .createQueryBuilder('o')
        .select(['o.order_id', 'o.status', 'o.created_at'])
        .addSelect('GROUP_CONCAT(p.name SEPARATOR \', \')', 'items')
        .innerJoin(OrderItem, 'oi', 'o.order_id = oi.order_id')
        .innerJoin(Product, 'p', 'oi.product_id = p.id')
        .where('o.order_id = :orderId', { orderId })
        .groupBy('o.order_id, o.status, o.created_at')
        .getRawOne();

      if (!order) return 'Order not found. Please check your order ID.';
      const response = `Order ${order.order_id} is ${order.status}. Items: ${order.items}. Placed on ${new Date(order.created_at).toISOString().split('T')[0]}.`;
      await this.saveConversation(userId, sessionId, message, response);
      return response;
    }

    if (text.includes('classic t-shirt') && (text.includes('stock') || text.includes('left'))) {
      const stock = await this.inventoryItemRepository
        .createQueryBuilder('ii')
        .select('COUNT(ii.id)', 'stock')
        .where('ii.product_name LIKE :name', { name: '%Classic T-Shirt%' })
        .andWhere('ii.sold_at IS NULL')
        .getRawOne();

      const response = `Classic T-Shirt has ${stock.stock} units left in stock.`;
      await this.saveConversation(userId, sessionId, message, response);
      return response;
    }

    // Delegate other queries to LLM
    try {
      const llmResponse = await axios.post(
        this.llmApiUrl,
        {
          query: message,
          context: 'E-commerce support chatbot. Provide answers based on order status, returns, top products, or product availability using the provided database.',
        },
        {
          headers: {
            'Authorization': `Bearer ${this.llmApiKey}`,
            'Content-Type': 'application/json',
          },
        }
      );
      const response = llmResponse.data.response || "I'm sorry, I couldn't process your request.";
      await this.saveConversation(userId, sessionId, message, response);
      return response;
    } catch (error) {
      console.error('LLM API error:', error);
      const fallbackResponse = "I'm sorry, something went wrong. Try asking about order status, returns, top products, or product availability.";
      await this.saveConversation(userId, sessionId, message, fallbackResponse);
      return fallbackResponse;
    }
  }

  private async saveConversation(userId: number, sessionId: string, query: string, response: string): Promise<void> {
    let conversation = await this.conversationRepository.findOne({ where: { session_id: sessionId, user: { id: userId } } });
    if (!conversation) {
      conversation = this.conversationRepository.create({ session_id: sessionId, user: { id: userId }, messages: [] });
    }
    conversation.messages.push({ query, response, timestamp: new Date() });
    await this.conversationRepository.save(conversation);
  }

  async getConversationHistory(userId: number, sessionId: string): Promise<Conversation> {
    const conversation = await this.conversationRepository.findOne({ where: { session_id: sessionId, user: { id: userId } } }) || 
      this.conversationRepository.create({ session_id: sessionId, user: { id: userId }, messages: [] });
    return conversation;
  }

  async getConversationCount(): Promise<number> {
    return this.conversationRepository.count();
  }
}
