import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { RestaurantsModule } from './restaurants/restaurants.module';

@Module({
  imports: [UsersModule, AuthModule, RestaurantsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
