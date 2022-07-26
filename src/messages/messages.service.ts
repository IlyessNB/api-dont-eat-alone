import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateMessageDto } from './dto/create-message.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Message } from './message.entity';
import { UsersService } from '../users/users.service';
import { MessageNotFoundByUserIdException } from './exception/message-not-found-by-user-id-exception';

@Injectable()
export class MessagesService {
  constructor(
    @InjectRepository(Message)
    private messageRepository: Repository<Message>,
    private usersService: UsersService,
  ) {}

  async create(createMessageDto: CreateMessageDto, userId: number) {
    try {
      const message = this.messageRepository.create({
        content: createMessageDto.content,
        sender: await this.usersService.findByUserId(userId),
        receiver: await this.usersService.findByUserId(
          createMessageDto.receiverId,
        ),
      });
      return this.messageRepository.save(message);
    } catch (error) {
      throw new BadRequestException(createMessageDto, 'Message creation error');
    }
  }

  async findByUserId(loggedUserId: number, userId: number) {
    const loggedUser = await this.usersService.findByUserId(loggedUserId);
    const user = await this.usersService.findByUserId(userId);
    const messages = await this.messageRepository.find({
      where: [
        { receiver: user, sender: loggedUser },
        { receiver: loggedUser, sender: user },
      ],
      relations: ['sender', 'receiver'],
    });
    if (messages) {
      return messages;
    }
    throw new MessageNotFoundByUserIdException(userId);
  }
}
