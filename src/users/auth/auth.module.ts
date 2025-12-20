import { forwardRef, Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { JwtConstants } from 'src/config/global.constant';
import { UsersModule } from '../users.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

@Module({
  providers: [AuthService],
  controllers: [AuthController],
  imports: [
    JwtModule.register({
      global: true,
      secret: JwtConstants.secret,
      signOptions: { expiresIn: '15m' },
    }),
    forwardRef(() => UsersModule),
  ],
})
export class AuthModule {}
