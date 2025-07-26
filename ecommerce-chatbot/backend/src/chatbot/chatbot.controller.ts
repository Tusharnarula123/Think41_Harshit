
import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { ChatbotService } from './chatbot.service';
import { MessageDto } from './dto/message.dto';
import { ResponseDto } from './dto/response.dto';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('chatbot')
@Controller('chat')
export class ChatbotController {
  constructor(private readonly chatbotService: ChatbotService) {}

  @Post()
  @ApiOperation({ summary: 'Process a chatbot message' })
  @ApiResponse({ status: 200, description: 'Returns chatbot response', type: ResponseDto })
  async processMessage(@Body() messageDto: MessageDto): Promise<ResponseDto> {
    const response = await this.chatbotService.processMessage(messageDto.userId, messageDto.text);
    return { response };
  }

  @Get('health')
  @ApiOperation({ summary: 'Health check endpoint' })
  @ApiResponse({ status: 200, description: 'Returns health status' })
  healthCheck() {
    return { status: 'healthy', timestamp: new Date().toISOString() };
  }

  @Get('metrics')
  @ApiOperation({ summary: 'Get chatbot metrics' })
  @ApiResponse({ status: 200, description: 'Returns basic metrics' })
  async getMetrics() {
    const conversationCount = await this.chatbotService.getConversationCount();
    return { total_conversations: conversationCount, timestamp: new Date().toISOString() };
  }

  }
