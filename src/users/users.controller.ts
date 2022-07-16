import { Body, Controller, Get, Param, Patch, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { JwtAuthGuard } from '../auth/jwt-auth-guard';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('api/users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get()
  findAllUser() {
    return this.usersService.getAll();
  }

  @Get('email/:email')
  async getUserByMail(@Param('email') email) {
    return this.usersService.findByMail(email);
  }

  @Get('id/:userId')
  async getUserById(@Param('userId') userId) {
    return this.usersService.findByUserId(userId);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':userId')
  async updateUser(
    @Param('userId') userId: number,
    @Body() userUpdate: UpdateUserDto,
  ) {
    return this.usersService.updateUser(userId, userUpdate);
  }
}
