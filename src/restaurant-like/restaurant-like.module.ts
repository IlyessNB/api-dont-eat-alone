import { Module } from '@nestjs/common';
import { RestaurantLikeService } from './restaurant-like.service';
import { RestaurantLikeController } from './restaurant-like.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RestaurantLike } from './restaurant-like.entity';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [TypeOrmModule.forFeature([RestaurantLike]), UsersModule],
  providers: [RestaurantLikeService],
  controllers: [RestaurantLikeController],
})
export class RestaurantLikeModule {}
