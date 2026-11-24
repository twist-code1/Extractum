import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';
import { GoogleProfileDto } from './dto/google-profile.dto.js';

@Injectable()
export class UsersService {
    constructor(private prisma: PrismaService) {}
    async upsertGoogleUser(dto: GoogleProfileDto){
        return this.prisma.user.upsert({
            where: { googleId: dto.googleId },
            update: {
                name: dto.name,
                avatarUrl: dto.avatarUrl,
            },
            create: {
                googleId: dto.googleId,
                email: dto.email,
                name: dto.name,
                avatarUrl: dto.avatarUrl,
            }
        })
    }
    async findOne(id: number){
        return this.prisma.user.findUnique({
            where: { id: id }
        })
    }
}
