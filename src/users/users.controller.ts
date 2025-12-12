import { Body, Controller, Get, Post, UsePipes } from '@nestjs/common';
import { UserRegisterPipe } from 'src/pipes';
import { UserRegisterDto } from './models';
import { UsersService } from './users.service';

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
  @UsePipes(new UserRegisterPipe())
  public registerUser(@Body() userRegisterDto: UserRegisterDto) {
    return this.usersService.registerUser(userRegisterDto);
  }

  @Post('/login')
  public loginUser() {
    return this.usersService.loginUser();
  }
}
