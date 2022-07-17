import { NotFoundException } from '@nestjs/common';

export class UserLikeNotFoundByIdException extends NotFoundException {
  constructor(userLikeId: number) {
    super(`User like with id ${userLikeId} not found`);
  }
}
