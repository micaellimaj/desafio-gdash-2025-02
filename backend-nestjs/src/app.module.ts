import { Module, OnModuleInit } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
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
  providers: [
    ConfigService
  ],
})
export class AppModule implements OnModuleInit {
  constructor(
    private authService: AuthService,
    private configService: ConfigService,
  ) {}

  async onModuleInit() {
    const adminEmail = this.configService.get<string>('ADMIN_EMAIL');
    const adminPass = this.configService.get<string>('ADMIN_PASSWORD');
    const adminName = this.configService.get<string>('ADMIN_NAME') || 'Admin Padrão';

    if (adminEmail && adminPass && adminPass.length >= 6) {
      await this.authService.createDefaultAdmin(
        adminEmail,
        adminPass,
        adminName,
      );
      console.log(`\n✅ Usuário Admin Padrão (${adminEmail}) verificado/criado.`);
    } else {
      console.warn('\n⚠️ WARNING: As variáveis ADMIN_EMAIL e ADMIN_PASSWORD não foram encontradas no .env. Nenhum usuário administrador padrão foi criado.');
    } }
}
