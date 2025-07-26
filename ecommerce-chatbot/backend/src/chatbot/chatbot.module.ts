
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ChatbotController } from './chatbot.controller';
import { ChatbotService } from './chatbot.service';
import { Conversation } from '../entities/conversation.entity';
import { InventoryItem } from '../entities/inventory-item.entity';
import { Order } from '../entities/order.entity';
import { OrderItem} from '../entities/order-item.entity'; // Fixed typo: should be order-item.entity
import { Product } from '../entities/product.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Conversation, InventoryItem, Order, OrderItem, Product]),
  ],
  controllers: [ChatbotController],
  providers: [ChatbotService],
})
export class ChatbotModule {}
