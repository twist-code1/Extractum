import { Injectable } from '@nestjs/common';
import { CreateProjectDto } from './dto/create-project.dto.js';
import { PrismaService } from '../prisma/prisma.service.js';

@Injectable()
export class ProjectsService {
  constructor(private prisma: PrismaService) {}
  async findAll(){ 
    return this.prisma.projects.findMany()
  }
  async findOne(id: number){
    return this.prisma.projects.findUnique({
      where: { id }
    })
  }
  async create(dto: CreateProjectDto){
    return this.prisma.projects.create({
      data: {
        name: dto.name
      }
    })
  }
  async delete(id: number){
    return this.prisma.projects.delete({
      where: { id }
    })
  }
}
