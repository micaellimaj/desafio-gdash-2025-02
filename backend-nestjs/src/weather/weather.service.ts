import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { WeatherLog, WeatherLogDocument } from './schemas/weather.schema';
import { WeatherLogDto } from './dto/weather-log.dto';
import { HttpService } from '@nestjs/axios';


@Injectable()
export class WeatherService {
  private readonly logger = new Logger(WeatherService.name);
  private readonly httpService: HttpService

  constructor(
    @InjectModel(WeatherLog.name)
    private weatherModel: Model<WeatherLogDocument>,

  ) { }

  async createLog(logData: WeatherLogDto): Promise<WeatherLog> {
    const logToPersist = {
      ...logData,
    };

    const created = new this.weatherModel(logToPersist);
    const saved = await created.save();
    return saved;
  }

  async findAllLogs(page = 1, limit = 50): Promise<WeatherLog[]> {
    const offset = (page - 1) * limit;
    return this.weatherModel.find().sort({ timestamp: -1 }).skip(offset).limit(limit).exec();
  }

  async findLogsForExport() {
    return this.weatherModel
      .find(
        {},
        {
          _id: 0,
          city: 1,
          timestamp: 1,
          temperatureCelsius: 1,
          humidityPercent: 1,
          windSpeedMS: 1,
          conditionDescription: 1,
        },
      )
      .exec();
  }

  async getTemperatureTimeline() {
    return this.weatherModel.find({}, { timestamp: 1, temperatureCelsius: 1, _id: 0 }).sort({ timestamp: 1 }).exec();
  }

  async getHumidityTimeline() {
    return this.weatherModel.find({}, { timestamp: 1, humidityPercent: 1, _id: 0 }).sort({ timestamp: 1 }).exec();
  }

  async getWindTimeline() {
    return this.weatherModel.find({}, { timestamp: 1, windSpeedMS: 1, _id: 0 }).sort({ timestamp: 1 }).exec();
  }

  async getTempVsHumidity() {
    return this.weatherModel
      .aggregate([
        { $project: { _id: 0, x: '$temperatureCelsius', y: '$humidityPercent', timestamp: 1 } },
        { $sort: { timestamp: 1 } },
      ])
      .exec();
  }

  async getWeatherConditionsFrequency() {
    return this.weatherModel
      .aggregate([
        { $group: { _id: '$conditionDescription', count: { $sum: 1 } } },
        { $project: { condition: '$_id', count: 1, _id: 0 } },
        { $sort: { count: -1 } },
      ])
      .exec();
  }

  async getTempHumidityMixed() {
    return this.weatherModel
      .find({}, { timestamp: 1, temperatureCelsius: 1, humidityPercent: 1, _id: 0 })
      .sort({ timestamp: 1 })
      .exec();
  }

  async getTemperatureTrend() {
    const data = await this.weatherModel.find({}, { timestamp: 1, temperatureCelsius: 1, _id: 0 }).sort({ timestamp: 1 }).exec();
    const window = 5;
    const trend = [];

    for (let i = 0; i < data.length; i++) {
      const start = Math.max(0, i - window + 1);
      const slice = data.slice(start, i + 1);
      const avg = slice.reduce((sum, v) => sum + v.temperatureCelsius, 0) / slice.length;
      trend.push({ timestamp: data[i].timestamp, movingAvg: Number(avg.toFixed(2)) });
    }

    return trend;
  }

  async getExtremes() {
  // Maior temperatura
  const maxTemperature = await this.weatherModel
    .findOne({}, { _id: 0 })
    .sort({ temperatureCelsius: -1 })
    .exec();

  // Menor temperatura
  const minTemperature = await this.weatherModel
    .findOne({}, { _id: 0 })
    .sort({ temperatureCelsius: 1 })
    .exec();

  // Maior velocidade do vento
  const maxWindSpeed = await this.weatherModel
    .findOne({}, { _id: 0 })
    .sort({ windSpeedMS: -1 })
    .exec();

  // Menor velocidade do vento
  const minWindSpeed = await this.weatherModel
    .findOne({}, { _id: 0 })
    .sort({ windSpeedMS: 1 })
    .exec();

  // Maior umidade
  const maxHumidity = await this.weatherModel
    .findOne({}, { _id: 0 })
    .sort({ humidityPercent: -1 })
    .exec();

  // Menor umidade
  const minHumidity = await this.weatherModel
    .findOne({}, { _id: 0 })
    .sort({ humidityPercent: 1 })
    .exec();

  return {
    maxTemperature,
    minTemperature,
    maxWindSpeed,
    minWindSpeed,
    maxHumidity,
    minHumidity,
  };
}

  async getScatterTempHumidity() {
  return this.weatherModel
    .find(
      {},
      {
        _id: 0,
        temperatureCelsius: 1,
        humidityPercent: 1,
        windSpeedMS: 1,
        timestamp: 1,
      },
    )
    .sort({ timestamp: 1 })
    .exec();
}


}