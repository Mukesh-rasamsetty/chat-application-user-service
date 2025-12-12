import { BadRequestException, PipeTransform } from '@nestjs/common';
import { UserRegisterDto } from 'src/users/models';

export class UserRegisterPipe implements PipeTransform {
  readonly passwordPattern =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

  transform(userRegisterDto: UserRegisterDto) {
    if (!userRegisterDto) {
      throw new BadRequestException('User registration data is missing');
    }

    if (!userRegisterDto.username || userRegisterDto.username.trim() === '') {
      throw new BadRequestException('Username is required');
    }

    if (
      !userRegisterDto.password ||
      !this.passwordPattern.test(userRegisterDto.password)
    ) {
      throw new BadRequestException(
        'Password must be at least 8 characters long and include at least one uppercase letter, one lowercase letter, one digit, and one special character',
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
