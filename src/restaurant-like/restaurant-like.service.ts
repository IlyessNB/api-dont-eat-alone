import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateRestaurantLikeDto } from './dto/create-restaurant-like.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RestaurantLike } from './restaurant-like.entity';
import { UsersService } from '../users/users.service';
import { RestaurantLikeNotFoundByIdException } from './exception/restaurant-like-not-found-by-id-exception';

@Injectable()
export class RestaurantLikeService {
  constructor(
    @InjectRepository(RestaurantLike)
    private restaurantLikeRepository: Repository<RestaurantLike>,
    private usersService: UsersService,
  ) {}

  async create(createRestaurantLike: CreateRestaurantLikeDto, userId: number) {
    try {
      const restaurantLike = this.restaurantLikeRepository.create({
        restaurantId: createRestaurantLike.restaurantId,
        user: await this.usersService.findByUserId(userId),
      });
      return this.restaurantLikeRepository.save(restaurantLike);
    } catch (error) {
      throw new BadRequestException(
        createRestaurantLike,
        'Restaurant like creation error',
      );
    }
  }

  async findById(id: number) {
    const restaurantLike = await this.restaurantLikeRepository.findOne({
      where: { id: id },
      relations: ['user'],
    });
    if (restaurantLike) {
      return restaurantLike;
    }
    throw new RestaurantLikeNotFoundByIdException(id);
  }

  async findByRestaurantId(restaurantId: string) {
    return await this.restaurantLikeRepository.find({
      where: { restaurantId: restaurantId },
      relations: ['user'],
    });
  }

  async findByUserId(userId: number) {
    const user = await this.usersService.findByUserId(userId);
    return await this.restaurantLikeRepository.find({
      where: { user: user },
    });
  }
}
