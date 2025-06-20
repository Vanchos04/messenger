import { IsEnum, IsInt, IsOptional, IsString, IsUrl } from "class-validator";
import { MessageType } from "@prisma/client";

export class CreateMessageDto {
  @IsInt()
  fromId: number;

  @IsInt()
  chatId: number;

  @IsEnum(MessageType)
  type: MessageType;

  @IsString()
  @IsOptional()
  content?: string; // For text content

  @IsUrl()
  @IsOptional()
  imageUrl?: string; // For image URLs (added for file-based messages)

  @IsOptional()
  @IsInt()
  replyTo?: number;
}
