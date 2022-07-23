import { NotFoundException } from '@nestjs/common';

export class MessageNotFoundByUserIdException extends NotFoundException {
  constructor(userId: number) {
    super(`Message with id ${userId} not found`);
  }
}
