import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthService } from '../auth.service'; // Import AuthService
import { User } from '@prisma/client';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({
      usernameField: 'email', // Use email as username for local strategy
    });
  }

  // Validate user credentials (email and password)
  async validate(email: string, password: string): Promise<User> {
    const user = await this.authService.signin(email, password);

    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    return user; // return the user object or just user.id if needed
  }
}
