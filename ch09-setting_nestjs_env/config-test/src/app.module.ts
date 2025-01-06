import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { WeatherModule } from './weather/weather.module';
import config from './config/config';

console.log('env : ' + process.env.NODE_ENV);
console.log('current working directory : ' + process.cwd());

@Module({
  // Setting ConfigModule
  imports: [ConfigModule.forRoot({ 
    isGlobal: true ,
    envFilePath: `${process.cwd()}/envs/${process.env.NODE_ENV}.env`,
    load: [config],
    cache: true,
    expandVariables: true,
  }), 
    WeatherModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}