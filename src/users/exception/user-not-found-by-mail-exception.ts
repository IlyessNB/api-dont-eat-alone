import { NotFoundException } from '@nestjs/common';

export class UserNotFoundByMailException extends NotFoundException {
  constructor(userMail: string) {
    super(`User with mail ${userMail} not found`);
  }
}
