import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { ContactModule } from './contact/contact.module';
import { SCHEMAS } from './schemas';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

@Module({
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService],
  imports: [ContactModule, AuthModule, MongooseModule.forFeature(SCHEMAS)],
})
export class UsersModule {}
