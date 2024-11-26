import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { PrismaService } from '@prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
  ) {}

  async hashPassword(password: string): Promise<string> {
    const saltRounds = 10;
    return bcrypt.hash(password, saltRounds);
  }

  async validatePassword(
    plainPassword: string,
    hashedPassword: string,
  ): Promise<boolean> {
    return bcrypt.compare(plainPassword, hashedPassword);
  }

  async signToken(userId: string): Promise<string> {
    return this.jwtService.signAsync({ userId });
  }

  async signup(
    email: string,
    password: string,
    firstName?: string,
    lastName?: string,
  ): Promise<any> {
    const existingUser = await this.prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      throw new Error('User with this email already exists');
    }

    const hashedPassword = await this.hashPassword(password);

    const newUser = await this.prisma.user.create({
      data: {
        email,
        hash: hashedPassword,
        firstName,
        lastName,
      },
    });

    const token = await this.signToken(newUser.id.toString());

    return {
      message: 'User created successfully',
      token,
    };
  }

  async signin(email: string, password: string): Promise<any> {
    const user = await this.prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      throw new Error('User not found');
    }

    const passwordValid = await this.validatePassword(password, user.hash);

    if (!passwordValid) {
      throw new Error('Invalid credentials');
    }

    const token = await this.signToken(user.id.toString());

    return {
      message: 'Sign-in successful',
      token,
    };
  }
}
