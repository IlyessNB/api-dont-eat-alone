import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { RestaurantLike } from '../restaurant-like/restaurant-like.entity';
import { UserLike } from '../user-like/user-like.entity';
import { Message } from '../messages/message.entity';

@Entity('user')
export class User {
  @PrimaryGeneratedColumn({ name: 'id' })
  id: number;

  @Column({ name: 'first_name' })
  firstName: string;

  @Column({ name: 'last_name' })
  lastName: string;

  @Column({ name: 'email', unique: true })
  email: string;

  @Column({ name: 'password' })
  password: string;

  @Column({ name: 'description' })
  description: string;

  @Column({ name: 'profile_picture_id', nullable: true })
  profilePicture?: string;

  @OneToMany(() => RestaurantLike, (restaurantLike) => restaurantLike.user)
  restaurantLiked: RestaurantLike[];

  @OneToMany(() => UserLike, (userLike) => userLike.likedUser)
  likedUser: UserLike[];

  @OneToMany(() => UserLike, (userLike) => userLike.likingUser)
  likingUser: UserLike[];

  @OneToMany(() => Message, (messageSent) => messageSent.sender)
  messageSent: Message[];

  @OneToMany(() => Message, (messageReceived) => messageReceived.receiver)
  messageReceived: Message[];
}
