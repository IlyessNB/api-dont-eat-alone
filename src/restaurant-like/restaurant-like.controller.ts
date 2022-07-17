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
import { RestaurantLikeService } from './restaurant-like.service';
import { CreateRestaurantLikeDto } from './dto/create-restaurant-like.dto';
import { ValidNumberStringIdParam } from '../utils/ValidNumberStringIdParam';
import RequestWithUser from '../auth/request-whit-user.interface';
import { ValidStringIdParam } from '../utils/ValidStringIdParam';

@Controller('api/restaurant-like')
export class RestaurantLikeController {
  constructor(private restaurantLikeService: RestaurantLikeService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  create(
    @Req() request: RequestWithUser,
    @Body() createRestaurantLike: CreateRestaurantLikeDto,
  ) {
    return this.restaurantLikeService.create(
      createRestaurantLike,
      request.user.id,
    );
  }

  @Get('/:id')
  async findFollowById(@Param() { id }: ValidNumberStringIdParam) {
    return this.restaurantLikeService.findById(Number(id));
  }

  @Get('/restaurant/:id')
  async findByRestaurantId(@Param() { id }: ValidStringIdParam) {
    return this.restaurantLikeService.findByRestaurantId(id);
  }

  @Get('/user/:id')
  async findByUserId(@Param() { id }: ValidNumberStringIdParam) {
    return this.restaurantLikeService.findByUserId(Number(id));
  }
}
