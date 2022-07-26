import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserLikeDto } from './dto/create-user-like.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserLike } from './user-like.entity';
import { UsersService } from '../users/users.service';
import { UserLikeNotFoundByIdException } from './exception/user-like-not-found-by-id-exception';

@Injectable()
export class UserLikeService {
  constructor(
    @InjectRepository(UserLike)
    private userLikeRepository: Repository<UserLike>,
    private usersService: UsersService,
  ) {}

  async create(createUserLike: CreateUserLikeDto, userId: number) {
    try {
      const userLike = this.userLikeRepository.create({
        likedUser: await this.usersService.findByUserId(
          createUserLike.likedUserId,
        ),
        likingUser: await this.usersService.findByUserId(userId),
      });
      await this.userLikeRepository.save(userLike);
      return this.match(userId, createUserLike.likedUserId);
    } catch (error) {
      throw new BadRequestException(createUserLike, 'User like creation error');
    }
  }

  async findById(id: number) {
    const userLike = await this.userLikeRepository.findOne({
      where: { id: id },
      relations: ['likedUser', 'likingUser'],
    });
    if (userLike) {
      return userLike;
    }
    throw new UserLikeNotFoundByIdException(id);
  }

  async findByLikedUserId(likedUserId: number) {
    const user = await this.usersService.findByUserId(likedUserId);
    return await this.userLikeRepository.find({
      where: { likedUser: user },
      relations: ['likingUser'],
    });
  }

  async findByLikingUserId(likingUserId: number) {
    const user = await this.usersService.findByUserId(likingUserId);
    return await this.userLikeRepository.find({
      where: { likingUser: user },
      relations: ['likedUser'],
    });
  }

  async match(userId1: number, userId2) {
    const user1 = await this.usersService.findByUserId(userId1);
    const user2 = await this.usersService.findByUserId(userId2);
    const match = await this.userLikeRepository.find({
      where: { likingUser: user2, likedUser: user1 },
      relations: ['likingUser', 'likedUser'],
    });
    if (match[0]) {
      console.log(match[0]);
      return true;
    }
    return false;
  }
}
