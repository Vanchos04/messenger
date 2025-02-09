import { Injectable } from "@nestjs/common";
import { PrismaService } from "@/prisma/prisma.service";
import { CreateMessageDto } from "./dto/create-message.dto";

@Injectable()
export class MessageService {
  constructor(private prisma: PrismaService) {}

  async sendMessage(dto: CreateMessageDto) {
    const chatExists = await this.prisma.chat.findUnique({
      where: { id: dto.chatId },
    });

    if (!chatExists) {
      throw new Error("Chat does not exist");
    }

    return this.prisma.message.create({
      data: {
        fromId: dto.fromId,
        toId: dto.toId,
        chatId: dto.chatId,
        type: dto.type,
        content: dto.content,
        replyTo: dto.replyTo ?? null,
      },
    });
  }

  async getChatMessages(chatId: number) {
    return this.prisma.message.findMany({
      where: { chatId },
      include: { from: true, to: true },
    });
  }
}
