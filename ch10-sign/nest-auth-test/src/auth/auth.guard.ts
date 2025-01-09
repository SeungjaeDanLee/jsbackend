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
// AuthGaurd 상속
export class LocalAuthGuard extends AuthGuard('local') {
    async canActivate(context: any): Promise<boolean> {
        const result = (await super.canActivate(context)) as boolean;
        // Run local storage
        const request = context.switchToHttp().getRequest();
        // Save session
        await super.logIn(request);
        return request;
    }
}

@Injectable()
export class AuthenticatedGuard implements CanActivate {
    canActivate(context: ExecutionContext): boolean {
        const request = context.switchToHttp().getRequest();
        // 세션에서 정보를 읽어서 인증 확인
        return request.isAuthenticated();
    }
}