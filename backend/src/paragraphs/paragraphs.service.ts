import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateParagraphDto } from './dto/create-paragraph.dto.js';
import { UpdateParagraphDto } from './dto/update-paragraph.dto.js';
import { PrismaService } from '../prisma/prisma.service.js';

@Injectable()
export class ParagraphsService {
  constructor(private prisma: PrismaService) {}

  private async ensureProjectOwnership(projectId: number, userId: number) {
    const project = await this.prisma.projects.findFirst({
      where: { id: projectId, userId },
    });
    if (!project) {
      throw new NotFoundException('Project not found');
    }
    return project;
  }

  async create(dto: CreateParagraphDto, userId: number) {
    await this.ensureProjectOwnership(dto.projectId, userId);
    return this.prisma.paragraphs.create({
      data: {
        title: dto.title,
        content: dto.content,
        sourceLink: dto.sourceLink,
        projectId: dto.projectId,
      },
    });
  }

  async findAll(userId: number, projectId?: number) {
    return this.prisma.paragraphs.findMany({
      where: {
        ...(projectId !== undefined ? { projectId } : {}),
        project: { userId },
      },
    });
  }

  async findOne(id: number, userId: number) {
    const paragraph = await this.prisma.paragraphs.findFirst({
      where: {
        id,
        project: { userId },
      },
    });
    if (!paragraph) {
      throw new NotFoundException('Paragraph not found');
    }
    return paragraph;
  }

  async update(id: number, dto: UpdateParagraphDto, userId: number) {
    await this.findOne(id, userId);
    if (dto.projectId !== undefined) {
      await this.ensureProjectOwnership(dto.projectId, userId);
    }
    return this.prisma.paragraphs.update({
      where: { id },
      data: {
        ...(dto.title !== undefined ? { title: dto.title } : {}),
        ...(dto.sourceLink !== undefined ? { sourceLink: dto.sourceLink } : {}),
        ...(dto.content !== undefined ? { content: dto.content } : {}),
        ...(dto.projectId !== undefined ? { projectId: dto.projectId } : {}),
      },
    });
  }

  async delete(id: number, userId: number) {
    await this.findOne(id, userId);
    return this.prisma.paragraphs.delete({
      where: { id },
    });
  }
}
