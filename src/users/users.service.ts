import { Injectable } from '@nestjs/common';
import { UserRegisterDto } from './models';
import { InjectModel } from '@nestjs/mongoose';
import type { Model } from 'mongoose';
import type { User } from './schemas/user.schema';

@Injectable()
export class UsersService {
  constructor(@InjectModel('User') private userModel: Model<User>) {}

  public getUserProfile() {
    return 'User profile data';
  }

  public registerUser(userRegisterDto: UserRegisterDto) {
    const user = new this.userModel(userRegisterDto);
    return user.save();
  }

  public loginUser() {
    return 'User login logic';
  }
}
