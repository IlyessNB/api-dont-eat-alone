import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { User } from '../users/user.entity';
import { RegisterDto } from './dto/register.dto';
import { compare, hash } from 'bcrypt';
import { ConfigService } from '@nestjs/config';
import { TokenPayload } from './token-payload.interface';

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  async getAuthenticatedUser(email: string, plainPassword: string) {
    try {
      const user = await this.userService.findByMail(email);
      await AuthService.verifyPassword(plainPassword, user.password);
      user.password = undefined;
      return user;
    } catch (error) {
      throw new HttpException(
        'Wrong credentials provided',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  private static async verifyPassword(
    plainTextPassword: string,
    hashedPassword: string,
  ) {
    const isPasswordMatching = await compare(plainTextPassword, hashedPassword);
    if (!isPasswordMatching) {
      throw new HttpException(
        'Wrong credentials provided',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async getJwtAccessToken(user: User) {
    const payload: TokenPayload = {
      email: user.email,
      sub: user.id,
      username: user.firstName,
    };
    return this.jwtService.sign(payload, {
      secret: this.configService.get('ACCESS_TOKEN_SECRET'),
      expiresIn: this.configService.get('ACCESS_TOKEN_EXPIRATION'),
    });
  }

  async register(registrationData: RegisterDto) {
    const hashedPassword = await hash(registrationData.password, 5);
    try {
      return await this.userService.createUser({
        ...registrationData,
        password: hashedPassword,
      });
    } catch (error) {
      throw new HttpException(
        'Something went wrong: ' + error,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
