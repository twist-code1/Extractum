import { IsNotEmpty, IsOptional, IsString } from "class-validator"

export class GoogleProfileDto {
    @IsNotEmpty()
    @IsString()
    googleId: string

    @IsNotEmpty()
    @IsString()
    email: string

    @IsNotEmpty()
    @IsOptional()
    name: string
}