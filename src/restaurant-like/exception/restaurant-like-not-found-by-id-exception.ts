import { NotFoundException } from '@nestjs/common';

export class RestaurantLikeNotFoundByIdException extends NotFoundException {
  constructor(restaurantLikeId: number) {
    super(`Restaurant like with id ${restaurantLikeId} not found`);
  }
}
