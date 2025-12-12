import { BadRequestException, PipeTransform } from '@nestjs/common';
import { UserRegisterDto } from 'src/users/models';

export class UserRegisterPipe implements PipeTransform {
  private readonly usernamePattern = /^[a-zA-Z][a-zA-Z0-9_-]{2,19}$/;
  private readonly passwordPattern =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

  transform(userRegisterDto: UserRegisterDto) {
    if (!userRegisterDto) {
      throw new BadRequestException('User registration data is missing');
    }

    if (!userRegisterDto.username || userRegisterDto.username.trim() === '') {
      throw new BadRequestException('Username is required');
    }

    if (
      !userRegisterDto.username ||
      !this.usernamePattern.test(userRegisterDto.username)
    ) {
      throw new BadRequestException(
        'Username must be 3-20 characters, start with a letter, and contain only alphanumeric characters, underscores, or hyphens',
      );
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
