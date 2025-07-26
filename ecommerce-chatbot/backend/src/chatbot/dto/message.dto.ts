
import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsInt } from 'class-validator';

export class MessageDto {
  @ApiProperty({ description: 'User ID' })
  @IsInt()
  @IsNotEmpty()
  userId: number;

  @ApiProperty({ description: 'User input message' })
  @IsString()
  @IsNotEmpty()
  text: string;
}
