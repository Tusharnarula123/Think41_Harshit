import { ChatbotService } from './chatbot.service';
import { MessageDto } from './dto/message.dto';
import { ResponseDto } from './dto/response.dto';
export declare class ChatbotController {
    private readonly chatbotService;
    constructor(chatbotService: ChatbotService);
    processMessage(messageDto: MessageDto): Promise<ResponseDto>;
    healthCheck(): {
        status: string;
        timestamp: string;
    };
    getMetrics(): Promise<{
        total_conversations: number;
        timestamp: string;
    }>;
}
