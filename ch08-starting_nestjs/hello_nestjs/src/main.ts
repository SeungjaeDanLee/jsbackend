import { NestFactory } from "@nestjs/core";
import { HelloModule } from "./hello.module";

// Start the NestJS application
async function bootstrap() {
    // Create a NestJS application
    const app = await NestFactory.create(HelloModule);

    // Start the application on port 3000
    await app.listen(3000, () => { console.log('Server is running on http://localhost:3000') });
}

bootstrap();