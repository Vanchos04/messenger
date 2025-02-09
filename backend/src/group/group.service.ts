import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { CreateGroupDto } from "./dto/create-group.dto";
import { AddMemberDto } from "./dto/add-member.dto";

@Injectable()
export class GroupService {
  constructor(private prisma: PrismaService) {}

  async createGroup(dto: CreateGroupDto) {
    return this.prisma.group.create({
      data: {
        name: dto.name,
        info: dto.info,
        creatorId: dto.creatorId,
        members: {
          create: {
            userId: dto.creatorId,
          },
        },
      },
      include: {
        members: true,
      },
    });
  }

  async addMember(dto: AddMemberDto) {
    const group = await this.prisma.group.findUnique({
      where: { id: dto.groupId },
    });
    if (!group) throw new NotFoundException("Group not found");

    return this.prisma.groupMember.create({
      data: {
        groupId: dto.groupId,
        userId: dto.userId,
      },
    });
  }

  async getUserGroups(userId: number) {
    return this.prisma.group.findMany({
      where: {
        members: {
          some: { userId },
        },
      },
      include: {
        members: { include: { user: true } },
      },
    });
  }

  async searchGroups(query: string) {
    return this.prisma.group.findMany({
      where: {
        name: { contains: query, mode: "insensitive" },
      },
    });
  }
}
