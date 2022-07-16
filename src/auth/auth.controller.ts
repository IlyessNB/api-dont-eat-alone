import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { LocalAuthGuard } from './local-auth-guard';
import RequestWithUser from './request-whit-user.interface';
import { AuthService } from './auth.service';
import RegisterDto from './dto/register.dto';

@Controller('api/auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Req() request: RequestWithUser) {
    const access_token = await this.authService.getJwtAccessToken(request.user);
    return {
      access_token: access_token,
    };
  }

  @Post('register')
  register(@Body() registrationData: RegisterDto) {
    return this.authService.register(registrationData);
  }
}
