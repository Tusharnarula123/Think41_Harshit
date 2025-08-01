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
exports.ChatbotController = void 0;
const common_1 = require("@nestjs/common");
const chatbot_service_1 = require("./chatbot.service");
const message_dto_1 = require("./dto/message.dto");
const response_dto_1 = require("./dto/response.dto");
const swagger_1 = require("@nestjs/swagger");
let ChatbotController = class ChatbotController {
    constructor(chatbotService) {
        this.chatbotService = chatbotService;
    }
    async processMessage(messageDto) {
        const response = await this.chatbotService.processMessage(messageDto.userId, messageDto.text);
        return { response };
    }
    healthCheck() {
        return { status: 'healthy', timestamp: new Date().toISOString() };
    }
    async getMetrics() {
        const conversationCount = await this.chatbotService.getConversationCount();
        return { total_conversations: conversationCount, timestamp: new Date().toISOString() };
    }
};
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({ summary: 'Process a chatbot message' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Returns chatbot response', type: response_dto_1.ResponseDto }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [message_dto_1.MessageDto]),
    __metadata("design:returntype", Promise)
], ChatbotController.prototype, "processMessage", null);
__decorate([
    (0, common_1.Get)('health'),
    (0, swagger_1.ApiOperation)({ summary: 'Health check endpoint' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Returns health status' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], ChatbotController.prototype, "healthCheck", null);
__decorate([
    (0, common_1.Get)('metrics'),
    (0, swagger_1.ApiOperation)({ summary: 'Get chatbot metrics' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Returns basic metrics' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ChatbotController.prototype, "getMetrics", null);
ChatbotController = __decorate([
    (0, swagger_1.ApiTags)('chatbot'),
    (0, common_1.Controller)('chat'),
    __metadata("design:paramtypes", [chatbot_service_1.ChatbotService])
], ChatbotController);
exports.ChatbotController = ChatbotController;
//# sourceMappingURL=chatbot.controller.js.map