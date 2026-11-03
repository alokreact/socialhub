import { Controller, Post, Body, HttpCode, UseGuards, Get, Request } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Throttle } from '@nestjs/throttler';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  register(@Body() dto: RegisterDto) {
    return this.authService.register(dto);
  }

  @Throttle({ default: { ttl: 60000, limit: 5 } }) // 5 attempts per minute
  @Post('login')
  @HttpCode(200)
  login(@Body() dto: LoginDto) {
    return this.authService.login(dto);
  }

  @Post('validate')
  @HttpCode(200)
  validate(@Body('token') token: string) {
    return this.authService.validateToken(token);
  }

  @Get('me')
  @UseGuards(AuthGuard('jwt'))
  me(@Request() req) {
    return req.user;
  }
}
