import {
  BadRequestException,
  Body,
  Controller,
  HttpCode,
  NotFoundException,
  Post,
  UnauthorizedException,
  UseGuards,
} from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthDto } from "./dto/auth.dto";
import { JwtAuthGuard } from "@/auth/guards/jwt.guard";
import { LocalAuthGuard } from "@/auth/guards/local.guard";

@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @HttpCode(200)
  @Post("signup")
  async signup(@Body() authDto: AuthDto) {
    return this.authService.signup(authDto);
  }

  @HttpCode(200)
  @Post("signin")
  async signin(@Body() authDto: AuthDto) {
    return this.authService.signin(authDto);
  }
}
