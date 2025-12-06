import { Module } from '@nestjs/common';
import { WeatherService } from './weather.service';
import { WeatherController } from './weather.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { WeatherLog, WeatherLogSchema } from './schemas/weather.schema';
import { HttpModule } from '@nestjs/axios';


@Module({
  imports: 
  [ HttpModule,
    MongooseModule.forFeature([
      { name: WeatherLog.name, schema: WeatherLogSchema },
    ]),
  ],
  controllers: [WeatherController],
  providers: [WeatherService],
})
export class WeatherModule {}
