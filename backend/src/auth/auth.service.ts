import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from "@nestjs/common";
import * as bcrypt from "bcrypt";
import { PrismaService } from "../prisma/prisma.service";
import { JwtService } from "@nestjs/jwt";
import { User } from "prisma";
import * as jwt from "jsonwebtoken";
import { AuthDto } from "@/auth/dto/auth.dto";

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

  async signup(authDto: AuthDto) {
    const { email, password, username } = authDto;
    console.log(authDto);
    const existingUser = await this.prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      throw new Error("User with this email already exists");
    }

    const hashedPassword = await this.hashPassword(password);

    const newUser = await this.prisma.user.create({
      data: {
        email,
        hash: hashedPassword,
        username,
      },
    });

    const token = await this.signToken(newUser.id.toString());

    return {
      message: "User created successfully",
      token,
      id: newUser.id,
      email: newUser.email,
      username: newUser.username,
    };
  }

  async findUserByEmail(email: string): Promise<User | null> {
    return this.prisma.user.findUnique({
      where: { email },
    });
  }

  async signin(authDto: AuthDto) {
    const { email, password } = authDto;
    console.log(authDto);
    const user = await this.prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      throw new NotFoundException("User not found");
    }

    const passwordValid = await this.validatePassword(password, user.hash);

    if (!passwordValid) {
      throw new UnauthorizedException("Invalid credentials");
    }

    let token: string;
    try {
      token = await this.signToken(user.id.toString());
    } catch (error) {
      throw new UnauthorizedException("Error generating token");
    }

    return {
      message: "Sign-in successful",
      token,
    };
  }

  private async validatePassword(
    password: string,
    hash: string,
  ): Promise<boolean> {
    return bcrypt.compare(password, hash);
  }

  private async signToken(userId: string): Promise<string> {
    const secretKey = process.env.JWT_SECRET || "defaultSecret";
    const token = jwt.sign({ userId }, secretKey, { expiresIn: "1h" });
    return token;
  }

  async validateUser(email: string, password: string): Promise<User | null> {
    const user = await this.findUserByEmail(email);

    if (!user) {
      return null;
    }

    const passwordValid = await this.validatePassword(password, user.hash);

    if (!passwordValid) {
      return null;
    }

    return user;
  }
}
