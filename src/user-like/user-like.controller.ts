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
import { CreateUserLikeDto } from './dto/create-user-like.dto';
import { UserLikeService } from './user-like.service';
import RequestWithUser from '../auth/request-whit-user.interface';
import { ValidNumberStringIdParam } from '../utils/ValidNumberStringIdParam';

@Controller('api/user-like')
export class UserLikeController {
  constructor(private userLikeService: UserLikeService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  create(
    @Req() request: RequestWithUser,
    @Body() createUserLike: CreateUserLikeDto,
  ) {
    return this.userLikeService.create(createUserLike, request.user.id);
  }

  @Get('/:id')
  async findById(@Param() { id }: ValidNumberStringIdParam) {
    return this.userLikeService.findById(Number(id));
  }

  @Get('/liked/:id')
  async findByLikedUserId(@Param() { id }: ValidNumberStringIdParam) {
    return this.userLikeService.findByLikedUserId(Number(id));
  }

  @Get('/liking/:id')
  async findByLikingUserId(@Param() { id }: ValidNumberStringIdParam) {
    return this.userLikeService.findByLikingUserId(Number(id));
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  getUsersDM(@Req() request: RequestWithUser) {
    return this.userLikeService.getUsersDm(request.user.id);
  }
}
