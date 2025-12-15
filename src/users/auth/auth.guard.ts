/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import {
  Injectable,
  UnauthorizedException,
  type CanActivate,
  type ExecutionContext,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { IS_PUBLIC_KEY } from 'src/config/public.decorator';
import { UserLogger } from 'src/logger';

@Injectable()
export class AuthGuard implements CanActivate {
  private readonly log: UserLogger;
  constructor(
    private readonly jwtService: JwtService,
    private readonly reflector: Reflector,
  ) {
    this.log = new UserLogger();
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    this.log.info('AuthGuard', 'Guradian called to verify JWT token');
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (isPublic) {
      this.log.info('AuthGuard', 'Public route, no token verification needed');
      return true;
    }
    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);
    if (!token) {
      this.log.error('AuthGuard', 'No token provided in request header');
      throw new UnauthorizedException('No token provided');
    }
    try {
      const payload = await this.jwtService.verifyAsync(token, {
        secret: 'jwtConstants.secret',
      });
      request.headers['username'] = payload.username;
    } catch (error) {
      this.log.error(
        'AuthGuard',
        `Token verification failed: ${error.message}`,
      );
      throw new UnauthorizedException();
    }
    this.log.info('AuthGuard', 'Token verified successfully');
    return true;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers['authorization']?.split(' ') ?? [];
    return type === 'Bearer' ? (token as string | undefined) : undefined;
  }
}
