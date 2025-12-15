import {
  BadRequestException,
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
} from '@nestjs/common';
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
  @Post('/login')
  async signIn(@Body() request: LoginRequest) {
    if (!request?.username || !request?.password) {
      this.log.error('AuthController', 'Username and password are required');
      throw new BadRequestException('Username and password are required');
    }
    return await this.authService.validateUser(request);
  }
}
