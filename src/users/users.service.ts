import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { hash } from 'bcrypt';
import { CreateUserDto } from './dto/create-user.dto';
import { UserNotFoundByMailException } from './exception/user-not-found-by-mail-exception';
import { UserNotFoundByIdException } from './exception/user-not-found-by-id-exception';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  async createUser(userCreate: CreateUserDto) {
    const user = this.userRepository.create({
      firstName: userCreate.firstName,
      lastName: userCreate.lastName,
      email: userCreate.email,
      password: userCreate.password,
      description: userCreate.description,
      profilePicture: userCreate.profilePicture || null,
    });
    return this.userRepository.save(user);
  }

  async updateUser(userId: number, userUpdate: UpdateUserDto) {
    const hashedPassword = await hash(userUpdate.password, 5);
    try {
      await this.userRepository.update(userId, {
        ...userUpdate,
        password: hashedPassword,
      });
    } catch (error) {
      throw new HttpException(
        'Something went wrong: ' + error,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    const updatedUser = await this.userRepository.findOne({
      where: { id: userId },
    });
    if (updatedUser) {
      return updatedUser;
    }
    throw new UserNotFoundByIdException(userId);
  }

  async getAll(): Promise<User[]> {
    return await this.userRepository.find();
  }

  async findByUserId(userId: number): Promise<User> {
    const user = await this.userRepository.findOne({
      where: { id: userId },
    });
    if (user) return user;
    throw new UserNotFoundByIdException(userId);
  }

  async findByMail(userEmail: string): Promise<User> {
    const user = await this.userRepository.findOne({
      where: { email: userEmail },
    });
    if (user) return user;
    throw new UserNotFoundByMailException(userEmail);
  }
}
