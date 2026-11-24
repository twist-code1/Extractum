import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { OAuth2Client } from 'google-auth-library';
import { UsersService } from '../users/users.service.js';

@Injectable()
export class AuthService {

    private readonly googleClient = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
    constructor(
        private readonly usersService: UsersService,
        private readonly jwtService: JwtService,
    ) {}
    async loginWithGoogle(idToken: string){
        try {
            const ticket = await this.googleClient.verifyIdToken({
                idToken: idToken,
                audience: process.env.GOOGLE_CLIENT_ID,
            });
            const payload = ticket.getPayload();
            if(!payload || !payload.email){
                throw new UnauthorizedException("Authorization error")
            }
            const user = await this.usersService.upsertGoogleUser({
                googleId: payload.sub,
                email: payload.email,
                name: payload.name,
                avatarUrl: payload.picture,
            })
            const accessToken = await this.jwtService.signAsync({ sub: user.id, email: user.email })
            return { accessToken, user }
        } catch(err){
            throw new UnauthorizedException("Authorization error")
        }
    }
}
