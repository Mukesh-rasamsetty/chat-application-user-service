import { Body, Controller, Get, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { UserRegisterDto } from './models';

@Controller('users')
export class UsersController {
  private usersService: UsersService;

  constructor(usersService: UsersService) {
    this.usersService = usersService;
  }

  @Get('/profile')
  public getUserProfile() {
    return this.usersService.getUserProfile();
  }

  @Post('/register')
  public registerUser(@Body() userRegisterDto: UserRegisterDto) {
    return this.usersService.registerUser(userRegisterDto);
  }

  @Post('/login')
  public loginUser() {
    return this.usersService.loginUser();
  }
}
