import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as cookieParser from 'cookie-parser';
import * as session from 'express-session';
import * as passport from 'passport';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // Add validationPipe object to the global pipe
  app.useGlobalPipes(new ValidationPipe());
  app.use(cookieParser());
  app.use(
    session({
      // It is key used for session encryption
      secret: 'very-important-secret',
      // Whether to always save sessions
      resave: false,
      // Create and store a session in advance
      // in an uninitialized state
      // before the session is saved.
      saveUninitialized: false,
      // an hour
      cookie: { maxAge: 3600000 },
    }),
  );
  // Initialized passport and session storage
  app.use(passport.initialize());
  app.use(passport.session());
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
