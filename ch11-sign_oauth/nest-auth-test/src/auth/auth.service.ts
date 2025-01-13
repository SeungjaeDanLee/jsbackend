import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from 'src/user/user.dto';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt';

// Use as a provider
@Injectable()
export class AuthService {
    // UserService is injected in constructor
    constructor(private userService: UserService) {}

    // There is an await statement inside the method, so async is needed
    async register(userDto: CreateUserDto) {
        // Checking already a registered user
        const user = await this.userService.getUser(userDto.email);
        if(user) {
            // An error occurs if there is already a registered user.
            throw new HttpException (
                'The user is already existed.',
                HttpStatus.BAD_REQUEST,
            )
        }

        // Password encryption
        const encryptedPassword = bcrypt.hashSync(userDto.password, 10);

        // Save to database.
        // If an error occurs while saving, a server error occurs.
        try {
            const user = await this.userService.createUser({
                ...userDto,
                password: encryptedPassword,
            });
            // After sign up, don't return the password
            user.password = undefined;
            return user;
        } catch (error) {
            throw new HttpException('Server Error', 500);
        }

    }

    async validateUser(email: string, password: string) {
        // Receive user information by email
        const user = await this.userService.getUser(email);

        // If there is no user, validation fails.
        if(!user) {
            return null;
        }

        // Pull out the password separately
        const { password: hashedPassword, ...userInfo } = user;
        // If the passwords match, success
        if (bcrypt.compareSync(password, hashedPassword)) {
            return userInfo;
        }

        return null;
    }
}
