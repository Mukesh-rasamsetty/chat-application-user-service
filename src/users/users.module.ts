import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { ContactModule } from './contact/contact.module';
import { UsersService } from './users.service';

@Module({
  controllers: [UsersController],
  providers: [UsersService],
  imports: [ContactModule],
})
export class UsersModule {}
