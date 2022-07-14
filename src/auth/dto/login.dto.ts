import { IsEmail, IsNotEmpty } from 'class-validator';

export class LoginDto {
  @IsNotEmpty()
  @IsEmail()
  readonly mail: string;
  @IsNotEmpty()
  readonly password: string;
}
