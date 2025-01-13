import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User) private userRepository: Repository<User>,
    ) {}

    createUser(user) : Promise<User> {
        return this.userRepository.save(user);
    }

    async getUser(email: string) {
        const result = await this.userRepository.findOne({
            where: { email },
        });
        return result;
    }

    async updateUser(email, _user) {
        const user: User = await this.getUser(email);
        console.log(_user);
        user.username = _user.username;
        user.password = _user.password;
        console.log(user);
        this.userRepository.save(user);
    }

    deleteUser(email: any) {
        return this.userRepository.delete({ email });
    }

    async findByEmailOrSave(email, username, providerId): Promise<User> {
        // Find user by email
        const foundUser = await this.getUser(email);
        // If find that
        if (foundUser) {
            // return user information
            return foundUser;
        }

        // If there is not user information, save that
        const newUser = await this.userRepository.save({
            email,
            username,
            providerId,
        });

        // After saving user information, return that.
        return newUser;
    }
}
