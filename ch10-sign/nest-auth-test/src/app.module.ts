import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user/user.entity';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    // Setting method of sqlite
    TypeOrmModule.forRoot({
      // Type of database
      type: 'sqlite',
      // Name of database
      database: 'nest-auth-test.sqlite',
      // Entity list
      entities: [User],
      // Synchronize schema to database
      synchronize: true,
      // Checking SQL log
      logging: true,
    }),
    UserModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
