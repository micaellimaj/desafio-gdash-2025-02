import { Module, OnModuleInit } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { WeatherModule } from './weather/weather.module';
import { PokemonModule } from './pokemon/pokemon.module';
import { ScheduleModule } from '@nestjs/schedule';
import { AuthService } from './auth/auth.service';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRoot(process.env.MONGO_URI || 'mongodb://localhost:27017/mydb'),
    UsersModule,
    AuthModule,
    WeatherModule,
    PokemonModule,
    ScheduleModule.forRoot(),
  ],
  controllers: [],
  providers: [],
})
export class AppModule implements OnModuleInit {
  constructor(private authService: AuthService) {}

  async onModuleInit() {
    const adminEmail = process.env.ADMIN_EMAIL || 'admin@example.com';
    const adminPass = process.env.ADMIN_PASSWORD || '123456';

    await this.authService.createDefaultAdmin(
      adminEmail,
      adminPass,
      'Admin Padrão',
    );
  }
}
