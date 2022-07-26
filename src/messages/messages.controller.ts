import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth-guard';
import RequestWithUser from '../auth/request-whit-user.interface';
import { MessagesService } from './messages.service';
import { CreateMessageDto } from './dto/create-message.dto';
import { ValidNumberStringIdParam } from '../utils/ValidNumberStringIdParam';

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
  @Get('/:id')
  async findById(
    @Param() { id }: ValidNumberStringIdParam,
    @Req() request: RequestWithUser,
  ) {
    return this.messagesService.findByUserId(request.user.id, Number(id));
  }
}
