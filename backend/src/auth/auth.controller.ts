import { Body, Controller, HttpCode, Post } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { RegisterDto } from "@/auth/dto/register.dto";
import { LoginDto } from "@/auth/dto/login.dto";

@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @HttpCode(200)
  @Post("signup")
  async signup(@Body() authDto: RegisterDto) {
    return this.authService.signup(authDto);
  }

  @HttpCode(200)
  @Post("signin")
  async signin(@Body() authDto: LoginDto) {
    return this.authService.signin(authDto);
  }
}
