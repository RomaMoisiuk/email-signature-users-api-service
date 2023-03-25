import { Body, Controller, Post } from '@nestjs/common';
import { AuthDataDto } from 'src/users/user-register.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Post('login')
  async login(@Body() data: AuthDataDto) {
    return this.authService.login(data);
  }

  @Post('register')
  async register(@Body() data: AuthDataDto) {
    return this.authService.register(data.email, data.password);
  }
}
