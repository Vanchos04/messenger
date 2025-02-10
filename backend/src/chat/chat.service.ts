import { Injectable } from "@nestjs/common";
import { PrismaService } from "@/prisma/prisma.service";
import { CreateChatDto } from "./dto/create-chat.dto";

@Injectable()
export class ChatService {
  constructor(private prisma: PrismaService) {}

  async createChat(dto: CreateChatDto) {
    return this.prisma.chat.create({
      data: {
        userId: dto.userId,
        directPartnerId: dto.directPartnerId,
        type: dto.type,
      },
    });
  }

  async getUserChats(userId: number) {
    return this.prisma.chat.findMany({
      where: { OR: [{ userId }, { directPartnerId: userId }] },
      include: { messages: true },
    });
  }
}
