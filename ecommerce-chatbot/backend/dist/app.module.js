"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const chatbot_module_1 = require("./chatbot/chatbot.module");
const distribution_center_entity_1 = require("./entities/distribution-center.entity");
const inventory_item_entity_1 = require("./entities/inventory-item.entity");
const order_item_entity_1 = require("./entities/order-item.entity");
const order_entity_1 = require("./entities/order.entity");
const product_entity_1 = require("./entities/product.entity");
const user_entity_1 = require("./entities/user.entity");
const conversation_entity_1 = require("./entities/conversation.entity");
let AppModule = class AppModule {
};
AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forRoot({
                type: 'mysql',
                username: 'root',
                password: 'password',
                database: 'ecommerce_chatbot',
                socketPath: '/tmp/mysql.sock',
                entities: [distribution_center_entity_1.DistributionCenter, inventory_item_entity_1.InventoryItem, order_item_entity_1.OrderItem, order_entity_1.Order, product_entity_1.Product, user_entity_1.User, conversation_entity_1.Conversation],
                migrations: ['src/migrations/*.ts'],
                synchronize: false,
            }),
            chatbot_module_1.ChatbotModule,
        ],
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map