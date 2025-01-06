import { Controller, Get } from "@nestjs/common";

// Decorator @Controller()
@Controller()
export class HelloController {
    // Decorator @Get() is used to define the HTTP request method
    @Get()
    hello() {
        return 'Hello NestJS';
    }
}