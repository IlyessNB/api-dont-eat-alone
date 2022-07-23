import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from '../users/user.entity';

@Entity('message')
export class Message {
  @PrimaryGeneratedColumn({ name: 'id' })
  id: number;

  @Column({ name: 'content' })
  content: string;

  @ManyToOne(() => User, (user) => user.likedUser, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'sender_id' })
  sender: User;

  @ManyToOne(() => User, (user) => user.likingUser, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'receiver_id' })
  receiver: User;
}
