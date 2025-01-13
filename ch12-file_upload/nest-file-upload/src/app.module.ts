import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

@Module({
  imports: [
    // Run initialization function
    ServeStaticModule.forRoot({
      // Specifies the directory where the actual files are located
      rootPath: join(__dirname, '..', 'uploads'),
      // Specifies the path to be appended to the url
      serveRoot: '/uploads',
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
