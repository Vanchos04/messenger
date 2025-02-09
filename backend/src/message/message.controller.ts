import { Controller, Get, Post, Body, Param } from "@nestjs/common";
import { MessageService } from "./message.service";
import { CreateMessageDto } from "./dto/create-message.dto";

@Controller("messages")
export class MessageController {
  constructor(private readonly messageService: MessageService) {}

  @Post()
  sendMessage(@Body() dto: CreateMessageDto) {
    return this.messageService.sendMessage(dto);
  }

  @Get(":chatId")
  getChatMessages(@Param("chatId") chatId: number) {
    return this.messageService.getChatMessages(chatId);
  }
}
