import { Module } from '@nestjs/common';
import { UserLikeController } from './user-like.controller';
import { UserLikeService } from './user-like.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserLike } from './user-like.entity';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [TypeOrmModule.forFeature([UserLike]), UsersModule],
  controllers: [UserLikeController],
  providers: [UserLikeService],
})
export class UserLikeModule {}
