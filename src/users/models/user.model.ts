export interface UserRegisterDto {
  readonly firstName: string;
  readonly lastName: string;
  readonly username: string;
  readonly password: string;
}

export interface UserResponse {
  readonly firstName: string;
  readonly lastName: string;
  readonly username: string;
  readonly createdAt: Date;
  readonly updatedAt: Date;
}

export interface User extends UserRegisterDto {
  readonly contacts: string[];
  readonly createdAt: Date;
  readonly updatedAt: Date;
}
