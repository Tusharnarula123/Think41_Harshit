"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChatbotService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const conversation_entity_1 = require("../entities/conversation.entity");
const inventory_item_entity_1 = require("../entities/inventory-item.entity");
const order_entity_1 = require("../entities/order.entity");
const order_item_entity_1 = require("../entities/order-item.entity");
const product_entity_1 = require("../entities/product.entity");
const uuid_1 = require("uuid");
const axios_1 = require("axios");
let ChatbotService = class ChatbotService {
    constructor(conversationRepository, inventoryItemRepository, orderRepository, orderItemRepository, productRepository) {
        this.conversationRepository = conversationRepository;
        this.inventoryItemRepository = inventoryItemRepository;
        this.orderRepository = orderRepository;
        this.orderItemRepository = orderItemRepository;
        this.productRepository = productRepository;
        this.llmApiUrl = 'https://api.x.ai/v1/chat';
        this.llmApiKey = 'your-api-key-here';
    }
    async processMessage(userId, message) {
        const text = message.toLowerCase().trim();
        const sessionId = (0, uuid_1.v4)();
        if (text.includes('top 5') && text.includes('sold') && text.includes('products')) {
            const topProducts = await this.inventoryItemRepository
                .createQueryBuilder('ii')
                .select('p.name', 'name')
                .addSelect('COUNT(ii.id)', 'unitsSold')
                .innerJoin(product_entity_1.Product, 'p', 'ii.product_id = p.id')
                .where('ii.sold_at IS NOT NULL')
                .groupBy('p.id, p.name')
                .orderBy('unitsSold', 'DESC')
                .limit(5)
                .getRawMany();
            if (!topProducts.length)
                return 'No sales data available.';
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
                .innerJoin(order_item_entity_1.OrderItem, 'oi', 'o.order_id = oi.order_id')
                .innerJoin(product_entity_1.Product, 'p', 'oi.product_id = p.id')
                .where('o.order_id = :orderId', { orderId })
                .groupBy('o.order_id, o.status, o.created_at')
                .getRawOne();
            if (!order)
                return 'Order not found. Please check your order ID.';
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
        try {
            const llmResponse = await axios_1.default.post(this.llmApiUrl, {
                query: message,
                context: 'E-commerce support chatbot. Provide answers based on order status, returns, top products, or product availability using the provided database.',
            }, {
                headers: {
                    'Authorization': `Bearer ${this.llmApiKey}`,
                    'Content-Type': 'application/json',
                },
            });
            const response = llmResponse.data.response || "I'm sorry, I couldn't process your request.";
            await this.saveConversation(userId, sessionId, message, response);
            return response;
        }
        catch (error) {
            console.error('LLM API error:', error);
            const fallbackResponse = "I'm sorry, something went wrong. Try asking about order status, returns, top products, or product availability.";
            await this.saveConversation(userId, sessionId, message, fallbackResponse);
            return fallbackResponse;
        }
    }
    async saveConversation(userId, sessionId, query, response) {
        let conversation = await this.conversationRepository.findOne({ where: { session_id: sessionId, user: { id: userId } } });
        if (!conversation) {
            conversation = this.conversationRepository.create({ session_id: sessionId, user: { id: userId }, messages: [] });
        }
        conversation.messages.push({ query, response, timestamp: new Date() });
        await this.conversationRepository.save(conversation);
    }
    async getConversationHistory(userId, sessionId) {
        const conversation = await this.conversationRepository.findOne({ where: { session_id: sessionId, user: { id: userId } } }) ||
            this.conversationRepository.create({ session_id: sessionId, user: { id: userId }, messages: [] });
        return conversation;
    }
    async getConversationCount() {
        return this.conversationRepository.count();
    }
};
ChatbotService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(conversation_entity_1.Conversation)),
    __param(1, (0, typeorm_1.InjectRepository)(inventory_item_entity_1.InventoryItem)),
    __param(2, (0, typeorm_1.InjectRepository)(order_entity_1.Order)),
    __param(3, (0, typeorm_1.InjectRepository)(order_item_entity_1.OrderItem)),
    __param(4, (0, typeorm_1.InjectRepository)(product_entity_1.Product)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], ChatbotService);
exports.ChatbotService = ChatbotService;
//# sourceMappingURL=chatbot.service.js.map