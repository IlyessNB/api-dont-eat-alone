import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from '../users/user.entity';

@Entity('restaurant_like')
export class RestaurantLike {
  @PrimaryGeneratedColumn({ name: 'id' })
  id: number;

  @Column({ name: 'restaurant_id' })
  restaurantId: string;

  @OneToOne(() => User, (user) => user.restaurantLiked, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'user_id' })
  user: User;
}
