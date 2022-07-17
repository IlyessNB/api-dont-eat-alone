import { Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from '../users/user.entity';

@Entity('user_like')
export class UserLike {
  @PrimaryGeneratedColumn({ name: 'id' })
  id: number;

  @ManyToOne(() => User, (user) => user.likedUser, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'liked_user_id' })
  likedUser: User;

  @ManyToOne(() => User, (user) => user.likingUser, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'liking_user_id' })
  likingUser: User;
}
