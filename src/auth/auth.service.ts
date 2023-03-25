import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import * as dotenv from 'dotenv';
import { UsersService } from '../users/users.service';
import { jwtConstants } from './constants';

dotenv.config();

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) { }

  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.usersService.findByEmail(email);

    if (!user) {
      return null;
    }

    const isPasswordsMatch = await bcrypt.compare(pass, user.password);

    if (user && isPasswordsMatch) {
      const { password, ...result } = user;

      return result;
    }

    return null;
  }

  async login(creds: any): Promise<{ access_token: string; email: string }> {
    const user = await this.validateUser(creds.email, creds.password);

    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload = { email: creds.email, sub: user.id };

    return {
      access_token: this.jwtService.sign(payload, {
        secret: jwtConstants.secret,
      }),
      email: user.email,
    };
  }

  async register(email: string, password: string): Promise<any> {
    const { password: pass, ...result } = await this.usersService.createUser(
      email,
      password,
    );

    return result;
  }
}
