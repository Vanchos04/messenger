import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  ParseIntPipe,
} from "@nestjs/common";
import { MessageService } from "./message.service";
import { CreateMessageDto } from "./dto/create-message.dto";

@Controller("messages")
export class MessageController {
  constructor(private readonly messageService: MessageService) {}

  @Post()
  sendMessage(@Body() dto: CreateMessageDto) {
    console.log("Received message DTO:", dto);
    return this.messageService.sendMessage(dto);
  }

  @Get(":chatId")
  getChatMessages(@Param("chatId", ParseIntPipe) chatId: number) {
    return this.messageService.getChatMessages(chatId);
  }
}
