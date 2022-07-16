import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator';

export class UpdateUserDto {
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  readonly firstName?: string;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  readonly lastName?: string;

  @IsEmail()
  @IsNotEmpty()
  @IsOptional()
  readonly email?: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  @IsOptional()
  readonly password?: string;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  readonly description?: string;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  readonly profilePicture?: string;
}
