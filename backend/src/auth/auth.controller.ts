import { Controller, Body, Get, Post, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service.js';
import { UsersService } from '../users/users.service.js';
import { JwtAuthGuard } from './jwt-auth.guard.js';
import { CurrentUser } from './current-user.decorator.js';
import { GoogleLoginDto } from './dto/google-login.dto.js';

@Controller('auth')
export class AuthController {
    constructor(
    private readonly authService: AuthService,
    private readonly usersService: UsersService
    ){}

    @Post('google')
    create(@Body() dto: GoogleLoginDto) {
        return this.authService.loginWithGoogle(dto.idToken)
    }

    @UseGuards(JwtAuthGuard)
    @Get('me')
    checkSession(@CurrentUser('sub') userId: number){
        return this.usersService.findOne(userId)
    }
}
