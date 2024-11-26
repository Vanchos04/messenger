import { Injectable, UnauthorizedException } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { Strategy } from 'passport-local'
import { AuthService } from '../auth.service' // Import AuthService

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({
      usernameFie'email'ail",
    });
  }

  async validate(email: string, password: string) {
    const credentials = await this.authService.signin(email, password)

    if (!credentials) {
      throw new UnauthorizedException('Invalid credentials')
    }

    return credentials
  }
}
