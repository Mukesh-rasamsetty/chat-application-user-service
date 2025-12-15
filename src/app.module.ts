import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MongoConstants } from './config/global.constant';
import { AuthGuard } from './users/auth/auth.guard';
import { UsersModule } from './users/users.module';

@Module({
  imports: [MongooseModule.forRoot(MongoConstants.uri), UsersModule],
  controllers: [],
  providers: [{ provide: 'APP_GUARD', useClass: AuthGuard }],
})
export class AppModule {}
