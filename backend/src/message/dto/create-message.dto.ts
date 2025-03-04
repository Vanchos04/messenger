import { IsEnum, IsInt, IsOptional, IsString } from "class-validator";
import { MessageType } from "@prisma/client";

export class CreateMessageDto {
  @IsInt()
  fromId: number;

  @IsInt()
  chatId: number;

  @IsEnum(MessageType)
  type: MessageType;

  @IsString()
  content: string;

  @IsOptional()
  @IsInt()
  replyTo?: number;
}
