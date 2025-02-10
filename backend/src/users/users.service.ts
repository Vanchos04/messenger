import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import * as bcrypt from "bcrypt";

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async getAll() {
    const users = await this.prisma.user.findMany();
    return users.map((user) => {
      delete user.hash;
      return user;
    });
  }

  async getUserById(userId: number) {
    const user = await this.prisma.user.findUnique({ where: { id: userId } });
    if (!user) {
      throw new NotFoundException("User not found");
    }
    delete user.hash;
    return user;
  }

  async editUser(
    userId: number,
    data: Partial<{ email: string; username: string; password: string }>,
  ) {
    if (data.password) {
      data.password = await this.hashPassword(data.password);
    }

    const user = await this.prisma.user.update({
      where: { id: userId },
      data,
    });

    delete user.hash;
    return user;
  }

  async deleteUser(userId: number) {
    const user = await this.prisma.user.findUnique({ where: { id: userId } });
    if (!user) {
      throw new NotFoundException("User not found");
    }
    await this.prisma.user.delete({ where: { id: userId } });
    return { message: "User deleted successfully" };
  }

  async createUser(email: string, username: string, password: string) {
    const hash = await this.hashPassword(password);

    const user = await this.prisma.user.create({
      data: {
        email,
        username,
        hash,
      },
    });

    delete user.hash;
    return user;
  }

  private async hashPassword(password: string): Promise<string> {
    const salt = await bcrypt.genSalt();
    return bcrypt.hash(password, salt);
  }

  async searchUsers(query: string) {
    return this.prisma.user.findMany({
      where: {
        OR: [
          { username: { contains: query, mode: "insensitive" } },
          { email: { contains: query, mode: "insensitive" } },
        ],
      },
    });
  }
}
