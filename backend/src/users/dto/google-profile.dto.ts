import { IsNotEmpty, IsOptional, IsString } from "class-validator"

export class GoogleProfileDto {
    @IsNotEmpty()
    @IsString()
    googleId: string

    @IsNotEmpty()
    @IsString()
    email: string

    @IsString()
    @IsOptional()
    name?: string

    @IsString()
    @IsOptional()
    avatarUrl?: string
}