import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { ContactModule } from './contact/contact.module';
import { UsersService } from './users.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from './schemas/user.schema';

@Module({
  controllers: [UsersController],
  providers: [UsersService],
  imports: [
    ContactModule,
    MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]),
  ],
})
export class UsersModule {}
