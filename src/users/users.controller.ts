import { Body, Controller, Get, Post, Query, UsePipes } from '@nestjs/common';
import { UserRegisterPipe } from 'src/pipes';
import type { UserRegisterDto, UserResponse } from './models';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  private usersService: UsersService;

  constructor(usersService: UsersService) {
    this.usersService = usersService;
  }

  @Get('/profile')
  public async getUserProfile(@Query('username') username: string) {
    const user = await this.usersService.getUserProfile(username);
    const userResponse: UserResponse = {
      firstName: user.firstName,
      lastName: user.lastName,
      username: user.username,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };
    return userResponse;
  }

  @Post('/register')
  @UsePipes(new UserRegisterPipe())
  public async registerUser(@Body() userRegisterDto: UserRegisterDto) {
    return await this.usersService.registerUser(userRegisterDto);
  }
}
