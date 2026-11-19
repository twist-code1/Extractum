import { Injectable } from '@nestjs/common';
import { CreateParagraphDto } from './dto/create-paragraph.dto.js';
import { UpdateParagraphDto } from './dto/update-paragraph.dto.js';
import { PrismaService } from '../prisma/prisma.service.js';

@Injectable()
export class ParagraphsService {
  constructor(private prisma: PrismaService) {}
  create(dto: CreateParagraphDto) {
    return this.prisma.paragraphs.create({
      data: {
        title: dto.title,
        content: dto.content,
        sourceLink: dto.sourceLink,
        projectId: dto.projectId
      }
    })
  }

  findAll() {
    return this.prisma.paragraphs.findMany()
  }

  findOne(id: number) {
    return this.prisma.paragraphs.findUnique({
      where: { id }
    })
  }

  delete(id: number) {
    return this.prisma.paragraphs.delete({
      where: { id }
    })
  }
}
