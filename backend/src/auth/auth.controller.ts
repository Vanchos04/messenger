import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './dto/auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  async signup(@Body() authDto: AuthDto): Promise<any> {
    const { email, password, firstName, lastName } = authDto;
    return this.authService.signup(email, password, firstName, lastName);
  }

  @Post('signin')
  async signin(@Body() authDto: AuthDto): Promise<any> {
    const { email, password } = authDto;
    return this.authService.signin(email, password);
  }
}
