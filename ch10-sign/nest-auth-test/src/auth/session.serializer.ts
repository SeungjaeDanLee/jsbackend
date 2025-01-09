import { Injectable } from "@nestjs/common";
import { PassportSerializer } from "@nestjs/passport";
import { userInfo } from "node:os";
import { UserService } from "src/user/user.service";

@Injectable()
// Inherited from PassportSerializer
export class SessionSerializer extends PassportSerializer {

    // Inherited from userService
    constructor(private userService: UserService) {
        super();
    }
    
    // Used to store information in a session
    serializeUser(user: any, done: Function) {
        // Information to store in session
        done(null, user.email);
    }
    
    // Used to retrieve information from a session
    async deserializeUser(
        payload: any, 
        done: (err: Error, payload: any) => void,
    ): Promise<any> {
        const user = await this.userService.getUser(payload);
        // If there is no user information,
        // an error is sent to the done() function.
        if (!user) {
            done(new Error('No User'), null);
            return;
        }
        const { password, ...userInfo } = user;

        // If there is user information,
        // return user information
        done(null, userInfo);
    }
}