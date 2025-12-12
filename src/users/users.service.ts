import { HttpException, Injectable } from '@nestjs/common';
import { UserRegisterDto } from './models';
import { InjectModel } from '@nestjs/mongoose';
import type { Model } from 'mongoose';
import type { User } from './schemas/user.schema';
import { UserLogger } from 'src/logger';

@Injectable()
export class UsersService {
  private readonly log: UserLogger;

  constructor(@InjectModel('User') private userModel: Model<User>) {
    this.log = UserLogger.getLogger();
  }

  public getUserProfile() {
    return 'User profile data';
  }

  public async registerUser(userRegisterDto: UserRegisterDto) {
    this.log.info(
      'UsersService',
      `Registering user: ${userRegisterDto.username}`,
    );
    try {
      const newUser: User = {
        ...userRegisterDto,
        contacts: [],
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      const user = new this.userModel(newUser);
      await user.save();
      this.log.info(
        'UsersService',
        `User registered successfully: ${userRegisterDto.username}`,
      );
      return `User Registrated Successfully with username: ${userRegisterDto.username}`;
    } catch (error) {
      this.log.error('UsersService', `Error registering user: ${error}`);
      if (error?.code === 11000) {
        throw new HttpException('Username already exists', 400);
      }
      throw new HttpException('Error registering user', 500);
    }
  }

  public loginUser() {
    return 'User login logic';
  }
}
