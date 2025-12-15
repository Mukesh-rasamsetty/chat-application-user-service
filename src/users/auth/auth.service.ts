import { HttpException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserLogger } from 'src/logger';
import { UsersService } from '../users.service';
import type { LoginRequest, LoginResponse } from './auth.model';

@Injectable()
export class AuthService {
  private readonly log: UserLogger;
  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
  ) {
    this.log = UserLogger.getLogger();
  }

  public async validateUser(loginRequest: LoginRequest) {
    this.log.info('AuthService', `Validating user: ${loginRequest.username}`);
    const user = await this.userService.getUserProfile(loginRequest.username);
    if (
      !user ||
      user.username !== loginRequest.username ||
      user.password !== loginRequest.password
    ) {
      this.log.warn(
        'AuthService',
        `Invalid credentials for user: ${loginRequest.username}`,
      );
      throw new HttpException('Invalid credentials', 401);
    }
    this.log.info('AuthService', `User validated: ${loginRequest.username}`);
    const payload = { username: user.username, sub: user._id };
    const response: LoginResponse = {
      accessToken: await this.jwtService.signAsync(payload),
    };
    this.log.info(
      'AuthService',
      `Access token generated for user: ${loginRequest.username}`,
    );
    return response;
  }
}
