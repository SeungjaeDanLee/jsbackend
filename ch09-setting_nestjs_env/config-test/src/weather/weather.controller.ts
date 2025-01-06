import { Controller, Get } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Controller('weather')
export class WeatherController {
    constructor(private configService: ConfigService) {}

    @Get()
    public getWeather(): string {
        const apiUrl = this.configService.get('WEATHER_API_URL');
        const apiKey = this.configService.get('WEATHER_API_KEY');

        return this.callWeatherApi(apiUrl, apiKey);
    }

    private callWeatherApi(apiUrl: string, apiKey: string): string {
        console.log('getting datas of the weather');
        console.log(apiUrl);
        console.log(apiKey);
        return 'Tomorrow is sunny';
    }
}
