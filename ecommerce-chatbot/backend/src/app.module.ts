import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ChatbotModule } from './chatbot/chatbot.module';
import { DistributionCenter } from './entities/distribution-center.entity';
import { InventoryItem } from './entities/inventory-item.entity';
import { OrderItem } from './entities/order-item.entity';
import { Order } from './entities/order.entity';
import { Product } from './entities/product.entity';
import { User } from './entities/user.entity';
import { Conversation } from './entities/conversation.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      username: 'root',
      password: 'password',
      database: 'ecommerce_chatbot',
      socketPath: '/tmp/mysql.sock',  // replace with your actual socket path
      entities: [DistributionCenter, InventoryItem, OrderItem, Order, Product, User, Conversation],
      migrations: ['src/migrations/*.ts'],
      synchronize: false,
    }),
    ChatbotModule,
  ],
})
export class AppModule {}