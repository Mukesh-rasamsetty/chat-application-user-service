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

  public async getUserProfile(username: string) {
    this.log.info('UsersService', `Fetching profile for user: ${username}`);
    try {
      const user = await this.userModel.findOne({ username }).exec();
      if (!user) {
        this.log.error('UsersService', `User not found: ${username}`);
        throw new HttpException('User not found', 404);
      }
      this.log.info('UsersService', `User profile fetched: ${username}`);
      return user;
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      this.log.error('UsersService', `Error fetching user profile: ${error}`);
      throw new HttpException('Error fetching user profile', 500);
    }
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
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      if (error?.code === 11000) {
        throw new HttpException('Username already exists', 400);
      }
      throw new HttpException('Error registering user', 500);
    }
  }
}
