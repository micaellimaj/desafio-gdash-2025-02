import {
  Controller,
  Get,
  Post,
  Body,
  Query,
  Res,
  UseGuards,
} from '@nestjs/common';
import { Response } from 'express';
import { WeatherService } from './weather.service';
import { WeatherLog } from './schemas/weather.schema';
import { WeatherLogDto } from './dto/weather-log.dto';
import { ListLogsDto } from './dto/list-logs.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { Parser } from 'json2csv';
import * as ExcelJS from 'exceljs';
import { 
    ApiTags, 
    ApiOperation, 
    ApiResponse, 
    ApiBody, 
    ApiBearerAuth,
    ApiQuery,
} from '@nestjs/swagger';


@ApiBearerAuth()
@ApiTags('Weather')
@Controller('weather')
@UseGuards(JwtAuthGuard)
export class WeatherController {
  constructor(private readonly weatherService: WeatherService) {}

  @Post('logs')
  @ApiOperation({ summary: 'Registrar novo log de clima (Usado pelo Go Worker)' })
  @ApiBody({ type: WeatherLogDto, description: 'Dados brutos do clima coletados.' })
  @ApiResponse({ 
    status: 201, 
    description: 'Log criado com sucesso.', 
    type: WeatherLog 
  })
  @ApiResponse({ status: 401, description: 'Não autorizado.' })
  async receiveLog(@Body() weatherLogDto: WeatherLogDto): Promise<WeatherLog> {
    return this.weatherService.createLog(weatherLogDto);
  }

  @Get('logs')
  @ApiOperation({ summary: 'Obter logs de clima com paginação (Usado pelo Frontend)' })
  @ApiQuery({ name: 'page', required: false, description: 'Número da página', example: 1 })
  @ApiQuery({ name: 'limit', required: false, description: 'Itens por página', example: 50 })
  @ApiResponse({ 
    status: 200, 
    description: 'Lista de logs de clima.', 
    type: [WeatherLog] 
  })
  @ApiResponse({ status: 401, description: 'Não autorizado.' })
  async findAllLogs(@Query() listDto: ListLogsDto): Promise<WeatherLog[]> {
    return this.weatherService.findAllLogs(listDto.page, listDto.limit);
  }

  @Get('export.csv')
  @ApiOperation({ summary: 'Exportar todos os logs de clima como arquivo CSV' })
  @ApiResponse({ status: 200, description: 'Arquivo CSV com logs de clima.' })
  @ApiResponse({ status: 204, description: 'Nenhum log para exportar.' })
  @ApiResponse({ status: 401, description: 'Não autorizado.' })
  async exportCsv(@Res() res: Response) {
    const logs = await this.weatherService.findLogsForExport();
    if (!logs.length) return res.status(204).send();

    const formattedLogs = logs.map(log => ({
        ...log.toJSON(), 

        timestamp: new Date(log.timestamp).toLocaleString('pt-BR'), 
    }));
    const fields = [
      'city',
      'timestamp',
      'temperatureCelsius',
      'humidityPercent',
      'windSpeedMS',
      'conditionDescription',
    ];

    const parser = new Parser({ fields });
    const csvData = parser.parse(formattedLogs);

    res.setHeader('Content-Type', 'text/csv');
    res.setHeader(
      'Content-Disposition',
      `attachment; filename="weather_logs_${Date.now()}.csv"`,
    );

    res.status(200).send(csvData);
  }

  @Get('export.xlsx')
  @ApiOperation({ summary: 'Exportar todos os logs de clima como arquivo XLSX (Excel)' })
  @ApiResponse({ status: 200, description: 'Arquivo XLSX com logs de clima.' })
  @ApiResponse({ status: 204, description: 'Nenhum log para exportar.' })
  @ApiResponse({ status: 401, description: 'Não autorizado.' })
  async exportXlsx(@Res() res: Response) {
    const logs = await this.weatherService.findLogsForExport();
    if (!logs.length) return res.status(204).send();
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Weather Logs');

    worksheet.columns = [
      { header: 'Cidade', key: 'city', width: 20 },
      { header: 'Timestamp', key: 'timestamp', width: 25 },
      { header: 'Temp (°C)', key: 'temperatureCelsius', width: 12 },
      { header: 'Umidade (%)', key: 'humidityPercent', width: 12 },
      { header: 'Vento (m/s)', key: 'windSpeedMS', width: 12 },
      { header: 'Condição', key: 'conditionDescription', width: 30 },
    ];

    logs.forEach((log) => worksheet.addRow(log.toJSON()));

    const buffer = await workbook.xlsx.writeBuffer();

    res.setHeader(
      'Content-Type',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    );
    res.setHeader(
      'Content-Disposition',
      `attachment; filename="weather_logs_${Date.now()}.xlsx"`,
    );

    res.status(200).send(buffer);
  }

  @Get('chart/temperature')
  @ApiOperation({ summary: 'Obtém a linha do tempo da temperatura' })
  @ApiResponse({ status: 200, description: 'Lista de objetos {timestamp, temperatureCelsius}.' })
  getTemperatureChart() {
    return this.weatherService.getTemperatureTimeline();
  }

  @Get('chart/humidity')
  @ApiOperation({ summary: 'Obtém a linha do tempo da umidade' })
  @ApiResponse({ status: 200, description: 'Lista de objetos {timestamp, humidityPercent}.' })
  getHumidityChart() {
    return this.weatherService.getHumidityTimeline();
  }

  @Get('chart/wind')
  @ApiOperation({ summary: 'Obtém a linha do tempo da velocidade do vento' })
  @ApiResponse({ status: 200, description: 'Lista de objetos {timestamp, windSpeedMS}.' })
  getWindChart() {
    return this.weatherService.getWindTimeline();
  }

  @Get('chart/temp-vs-humidity')
  @ApiOperation({ summary: 'Obtém dados para Scatter Plot: Temperatura vs Umidade' })
  @ApiResponse({ status: 200, description: 'Lista de objetos {x: temp, y: humidity}.' })
  getTempVsHumidity() {
    return this.weatherService.getTempVsHumidity();
  }

  @Get('chart/conditions')
  @ApiOperation({ summary: 'Obtém a frequência de diferentes condições climáticas' })
  @ApiResponse({ status: 200, description: 'Lista de objetos {condition: string, count: number}.' })
  getWeatherConditionsFrequency() {
    return this.weatherService.getWeatherConditionsFrequency();
  }

  @Get('chart/temp-humidity')
  @ApiOperation({ summary: 'Obtém dados mistos de temperatura e umidade para um gráfico combinado' })
  @ApiResponse({ status: 200, description: 'Lista de objetos {timestamp, temperatureCelsius, humidityPercent}.' })
  getTempHumidityMixed() {
    return this.weatherService.getTempHumidityMixed();
  }

  @Get('chart/trend')
  @ApiOperation({ summary: 'Obtém a tendência de temperatura (média móvel)' })
  @ApiResponse({ status: 200, description: 'Lista de objetos {timestamp, movingAvg}.' })
  getTrend() {
    return this.weatherService.getTemperatureTrend();
  }

  @Get('chart/extremes')
  @ApiOperation({ summary: 'Obtém os valores extremos (máximo/mínimo) de logs' })
  @ApiResponse({ status: 200, description: 'Objeto contendo logs extremos (maxTemp, minTemp, etc.).', type: Object })
  getExtremes() {
    return this.weatherService.getExtremes();
  }

 
  @Get('chart/scatter-temp-humidity')
  @ApiOperation({
    summary: 'Obtém dados para Scatter Plot (Temperatura × Umidade × Velocidade do vento)',
  })
  @ApiResponse({
    status: 200,
    description: 'Lista de objetos contendo temperaturaCelsius, humidityPercent, windSpeedMS e timestamp.',
    type: Object,
  })
  getScatterTempHumidity() {
    return this.weatherService.getScatterTempHumidity();
  }

}