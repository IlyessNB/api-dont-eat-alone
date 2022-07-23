import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth-guard';
import RequestWithUser from '../auth/request-whit-user.interface';
import { MessagesService } from './messages.service';
import { CreateMessageDto } from './dto/create-message.dto';

@Controller('api/messages')
export class MessagesController {
  constructor(private messagesService: MessagesService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  create(
    @Req() request: RequestWithUser,
    @Body() createMessageDto: CreateMessageDto,
  ) {
    return this.messagesService.create(createMessageDto, request.user.id);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  async findById(@Req() request: RequestWithUser) {
    return this.messagesService.findByUserId(request.user.id);
  }
}
