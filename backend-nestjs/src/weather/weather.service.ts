import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { WeatherLog, WeatherLogDocument } from './schemas/weather.schema';
import { WeatherLogDto } from './dto/weather-log.dto';

@Injectable()
export class WeatherService {
  private readonly logger = new Logger(WeatherService.name);

  constructor(
    @InjectModel(WeatherLog.name)
    private weatherModel: Model<WeatherLogDocument>,

  ) { }

  async createLog(logData: WeatherLogDto): Promise<WeatherLog> {
    const logToPersist = {
      ...logData,
      timestamp: new Date(logData.timestamp),
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
          rainProbabilityPercent: 1,
          cloudinessPercent: 1,
          rainVolume3hMM: 1,
          windGustMS: 1,
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

  async getRainTimeline() {
    return this.weatherModel.find({}, { timestamp: 1, rainProbabilityPercent: 1, _id: 0 }).sort({ timestamp: 1 }).exec();
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
    const maxTemp = await this.weatherModel.findOne({}, { _id: 0 }).sort({ temperatureCelsius: -1 }).exec();
    const minTemp = await this.weatherModel.findOne({}, { _id: 0 }).sort({ temperatureCelsius: 1 }).exec();
    const maxWind = await this.weatherModel.findOne({}, { _id: 0 }).sort({ windSpeedMS: -1 }).exec();
    const minHumidity = await this.weatherModel.findOne({}, { _id: 0 }).sort({ humidityPercent: 1 }).exec();

    return { maxTemperature: maxTemp, minTemperature: minTemp, maxWindSpeed: maxWind, minHumidity: minHumidity };
  }
}