import { ApiProperty } from '@nestjs/swagger';

export class ResponseDto {
  @ApiProperty({ description: 'Chatbot response message' })
  response: string;
}