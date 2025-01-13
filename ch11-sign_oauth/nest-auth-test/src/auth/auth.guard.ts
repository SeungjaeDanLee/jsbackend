import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthGuard } from "@nestjs/passport";
import { Observable } from "rxjs";

@Injectable()
export class LoginGuard implements CanActivate {
    constructor(private authService: AuthService) {}

    // Method of CanActivate interface
    async canActivate(context: any): Promise<boolean> {
        // Getting data from context to use request
        const request = context.switchToHttp().getRequest();

        // Authenticated if there is a cookie
        if (request.cookies['login']) {
            return true;
        }

        // Checking body data of request if there is no cookie
        if(!request.body.email || !request.body.password) {
            return false;
        }
        
        // Authenticated logic uses existing authService.validateUser
        const user = await this.authService.validateUser(
            request.body.email,
            request.body.password,
        );

        // return false if there is no user data
        if(!user) {
            return false;
        }

        // return true if there is user data, and add that to request
        request.user = user;
        return true;
    }
}

@Injectable()
// AuthGaurd inheritance
export class LocalAuthGuard extends AuthGuard('local') {
    async canActivate(context: any): Promise<boolean> {
        console.log('guard before canActivate');
        const result = (await super.canActivate(context)) as boolean;
        console.log('result : ' + result);
        console.log('guard after canActivate');
        // Run local storage
        const request = context.switchToHttp().getRequest();
        
        console.log(request.session);
        // Save session
        await super.logIn(request);
        console.log(request.session);

        return request;
    }
}

@Injectable()
export class AuthenticatedGuard implements CanActivate {
    canActivate(context: ExecutionContext): boolean {
        console.log('333');
        const request = context.switchToHttp().getRequest();
        // Verify authentication by reading information from the session
        return request.isAuthenticated();
    }
}

@Injectable()
// Using google strategy
export class GoogleAuthGuard extends AuthGuard('google') {
    async canActivate(context: any): Promise<boolean> {
        // Using method of parent's class
        const result = (await super.canActivate(context)) as boolean;

        // Get a request object from context
        const request = context.switchToHttp().getRequest();

        // Apply session
        await super.logIn(request);
        
        return result;
    }
}