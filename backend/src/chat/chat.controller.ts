import { Controller, Get, Post, Body, Param } from "@nestjs/common";
import { ChatService } from "./chat.service";
import { CreateChatDto } from "./dto/create-chat.dto";

@Controller("chats")
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

  @Post()
  createChat(@Body() dto: CreateChatDto) {
    return this.chatService.createChat(dto);
  }

  @Get(":userId")
  getUserChats(@Param("userId") userId: number) {
    return this.chatService.getUserChats(userId);
  }
}
