import { NotFoundException } from '@nestjs/common';

export class UserNotFoundByIdException extends NotFoundException {
  constructor(userId: number) {
    super(`User with id ${userId} not found`);
  }
}
