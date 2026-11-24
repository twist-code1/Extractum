import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { CreateProjectDto } from './dto/create-project.dto.js';
import { UpdateProjectDto } from './dto/update-project.dto.js';
import { PrismaService } from '../prisma/prisma.service.js';

@Injectable()
export class ProjectsService {
  constructor(private prisma: PrismaService) {}

  async findAll(userId: number) {
    return this.prisma.projects.findMany({
      where: { userId },
    });
  }

  async findOne(id: number, userId: number) {
    const project = await this.prisma.projects.findFirst({
      where: { id, userId },
      include: { paragraphs: true },
    });
    if (!project) {
      throw new NotFoundException('Project not found');
    }
    return project;
  }

  async create(dto: CreateProjectDto, userId: number) {
    try {
      return await this.prisma.projects.create({
        data: {
          name: dto.name,
          userId,
        },
      });
    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === 'P2002'
      ) {
        throw new ConflictException('Project with this name already exists');
      }
      throw error;
    }
  }

  async update(id: number, dto: UpdateProjectDto, userId: number) {
    await this.findOne(id, userId);
    try {
      return await this.prisma.projects.update({
        where: { id },
        data: {
          ...(dto.name !== undefined ? { name: dto.name } : {}),
        },
      });
    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === 'P2002'
      ) {
        throw new ConflictException('Project with this name already exists');
      }
      throw error;
    }
  }

  async delete(id: number, userId: number) {
    await this.findOne(id, userId);
    return this.prisma.projects.delete({
      where: { id },
    });
  }
}
