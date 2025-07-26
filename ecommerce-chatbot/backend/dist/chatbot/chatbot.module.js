"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChatbotModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const chatbot_controller_1 = require("./chatbot.controller");
const chatbot_service_1 = require("./chatbot.service");
const conversation_entity_1 = require("../entities/conversation.entity");
const inventory_item_entity_1 = require("../entities/inventory-item.entity");
const order_entity_1 = require("../entities/order.entity");
const order_item_entity_1 = require("../entities/order-item.entity");
const product_entity_1 = require("../entities/product.entity");
let ChatbotModule = class ChatbotModule {
};
ChatbotModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([conversation_entity_1.Conversation, inventory_item_entity_1.InventoryItem, order_entity_1.Order, order_item_entity_1.OrderItem, product_entity_1.Product]),
        ],
        controllers: [chatbot_controller_1.ChatbotController],
        providers: [chatbot_service_1.ChatbotService],
    })
], ChatbotModule);
exports.ChatbotModule = ChatbotModule;
//# sourceMappingURL=chatbot.module.js.map