import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreateUserLikeDto {
  @IsNumber()
  @IsNotEmpty()
  readonly likedUserId: number;
}
