import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-local";
import { AuthService } from "./auth.service";

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
    // PassportStrategy mix in
    constructor(private authService: AuthService) {
        // The default value is username,
        // so change it to email.
        super({ usernameField: 'email' });
    }

    // Validation of user information
    async validate(email: string, password: string): Promise<any> {
        const user = await this.authService.validateUser(email, password);
        if(!user) {
            // If there is null, error 401 occurs.
            return null;
        }
        // If there is not null, return user information.
        return user;
    }
}