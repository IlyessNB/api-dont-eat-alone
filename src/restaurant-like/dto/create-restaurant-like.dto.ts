import { IsNotEmpty, IsString } from 'class-validator';

export class CreateRestaurantLikeDto {
  @IsString()
  @IsNotEmpty()
  readonly restaurantId: string;
}
