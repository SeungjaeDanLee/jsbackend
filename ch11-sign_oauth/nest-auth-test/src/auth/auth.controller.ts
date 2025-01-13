import { Body, Controller, Get, Post, Request, Response, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from 'src/user/user.dto';
import { LoginGuard, LocalAuthGuard, AuthenticatedGuard, GoogleAuthGuard } from './auth.guard';

@Controller('auth')
export class AuthController {
    // AuthService is injected in constructor
    constructor(private authService: AuthService) {}

    @Post('register')
    // class-validator automatically validates 
    async register(@Body() userDto: CreateUserDto) {
        // Save user information using authService
        return await this.authService.register(userDto);
    }

    @Post('login')
    // Using both Request and Response
    async login(@Request() req, @Response() res) {
        const userInfo = await this.authService.validateUser(
            req.body.email,
            req.body.password,
        );

        // If there is a user data, save the cookie data to Response.
        if(userInfo) {
            res.cookie('login', JSON.stringify(userInfo), {
                // Read it from browser
                httpOnly: false,
                // 7 days
                maxAge: 1000 * 60 * 60 * 24 * 7,
            });
        }
        return res.send({ message: 'login success' });
    }

    // Using LoginGuard
    @UseGuards(LoginGuard)
    @Post('login2')
    async login2(@Request() req, @Response() res) {
        // If there is no cookie information 
        // but there is user information in the request, 
        // add cookie information to the response value.
        if (!req.cookies['login'] && req.user) {
            res.cookie('login', JSON.stringify(req.user), {
                httpOnly: true,
                maxAge: 1000 * 10,
            });
        }
        return res.send({ message: 'login2 success' });
    }

    // Method that runs only when signed in
    @UseGuards(LoginGuard)
    @Get('test-guard')
    testGuard() {
        return 'You can this sentence when you signed in';
    }

    @UseGuards(LocalAuthGuard)
    @Post('login3')
    login3(@Request() req) {
        return req.user;
    }

    @UseGuards(AuthenticatedGuard)
    @Get('test-guard2')
    testGuardWithSession(@Request() req) {
        return req.user;
    }

    // Router method to google login
    @Get('to-google')
    @UseGuards(GoogleAuthGuard)
    async googleAuth(@Request() req) {}

    // Router method that runs when moving
    // after executing callback after Google login
    @Get('google')
    @UseGuards(GoogleAuthGuard)
    async googleAuthRedirect(@Request() req, @Response() res) {
        const { user } = req;
        // res.redirect('http://localhost:3000/auth/test-guard2');
        return res.send(user);
    }
}
