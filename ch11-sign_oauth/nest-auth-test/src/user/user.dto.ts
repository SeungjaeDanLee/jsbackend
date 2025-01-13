import { IsEmail, IsString } from "class-validator";

// Make field(email, passwoed, username) attach decorator
export class CreateUserDto {
    @IsEmail()
    email: string;

    @IsString()
    password: string;

    @IsString()
    username: string;
}

// Dto for validating when a post is updated.
export class UpdateUserDto {
    @IsString()
    username: string;

    @IsString()
    password: string;
}