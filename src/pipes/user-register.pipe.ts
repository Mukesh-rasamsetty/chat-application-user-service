import { BadRequestException, PipeTransform } from '@nestjs/common';
import { UserRegisterDto } from 'src/users/models';

export class UserRegisterPipe implements PipeTransform {
  transform(userRegisterDto: UserRegisterDto) {
    if (!userRegisterDto) {
      throw new BadRequestException('User registration data is missing');
    }

    if (!userRegisterDto.username || userRegisterDto.username.trim() === '') {
      throw new BadRequestException('Username is required');
    }

    if (!userRegisterDto.password || userRegisterDto.password.length < 6) {
      throw new BadRequestException(
        'Password must be at least 6 characters long',
      );
    }

    if (!userRegisterDto.firstName || userRegisterDto.firstName.trim() === '') {
      throw new BadRequestException('First name is required');
    }

    if (!userRegisterDto.lastName || userRegisterDto.lastName.trim() === '') {
      throw new BadRequestException('Last name is required');
    }

    return userRegisterDto;
  }
}
