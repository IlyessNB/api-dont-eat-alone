import { IsEmail, IsNotEmpty } from 'class-validator';

export class ValidEmailParam {
  @IsEmail()
  @IsNotEmpty()
  email: string;
}
