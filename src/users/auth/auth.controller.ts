import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Headers,
  HttpCode,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { Public } from 'src/config/public.decorator';
import { UserLogger } from 'src/logger';
import type { LoginRequest } from './auth.model';
import { AuthService } from './auth.service';

@Controller('users/auth')
export class AuthController {
  private readonly log: UserLogger;

  constructor(private authService: AuthService) {
    this.log = UserLogger.getLogger();
  }

  @HttpCode(HttpStatus.OK)
  @Public()
  @Post('/login')
  async signIn(@Body() request: LoginRequest) {
    if (!request?.username || !request?.password) {
      this.log.error('AuthController', 'Username and password are required');
      throw new BadRequestException('Username and password are required');
    }
    return await this.authService.validateUser(request);
  }

  @HttpCode(HttpStatus.OK)
  @Get('/verify')
  verifyToken(@Headers('username') username: string) {
    return { m: 'Token is valid', q: username };
  }
}
