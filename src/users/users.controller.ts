import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Req,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { JwtAuthGuard } from '../auth/jwt-auth-guard';
import { UpdateUserDto } from './dto/update-user.dto';
import { ValidNumberStringIdParam } from '../utils/ValidNumberStringIdParam';
import RequestWithUser from '../auth/request-whit-user.interface';
import { ValidEmailParam } from '../utils/ValidEmailParam';

@Controller('api/users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get()
  findAllUser() {
    return this.usersService.getAll();
  }

  @Get('email/:email')
  async getUserByMail(@Param() { email }: ValidEmailParam) {
    return this.usersService.findByMail(email);
  }

  @Get('id/:id')
  async getUserById(@Param() { id }: ValidNumberStringIdParam) {
    return this.usersService.findByUserId(Number(id));
  }

  @UseGuards(JwtAuthGuard)
  @Patch()
  async updateUser(
    @Req() request: RequestWithUser,
    @Body() userUpdate: UpdateUserDto,
  ) {
    return this.usersService.updateUser(request.user.id, userUpdate);
  }
}
