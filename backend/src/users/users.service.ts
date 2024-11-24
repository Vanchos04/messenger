import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async getAll() {
    return this.prisma.user.findMany();
  }

  async editUser(userId: number) {
    const user = await this.prisma.user.update({
      where: {
        id: userId,
      },
      data: {},
    });
    delete user.hash;

    return user;
  }

  async deleteUser(userId: number) {
    await this.prisma.user.delete({ where: { id: userId } });
  }
}
