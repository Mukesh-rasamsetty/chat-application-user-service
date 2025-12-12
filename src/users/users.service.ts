import { Injectable } from '@nestjs/common';
import { UserRegisterDto } from './models';

@Injectable()
export class UsersService {
  public getUserProfile() {
    return 'User profile data';
  }

  public registerUser(userRegisterDto: UserRegisterDto) {
    return userRegisterDto;
  }

  public loginUser() {
    return 'User login logic';
  }
}
