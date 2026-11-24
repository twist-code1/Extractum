import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ParagraphsService } from './paragraphs.service.js';
import { CreateParagraphDto } from './dto/create-paragraph.dto.js';
import { UpdateParagraphDto } from './dto/update-paragraph.dto.js';
import { JwtAuthGuard } from '../auth/jwt-auth.guard.js';
import { CurrentUser } from '../auth/current-user.decorator.js';

@UseGuards(JwtAuthGuard)
@Controller('paragraphs')
export class ParagraphsController {
  constructor(private readonly paragraphsService: ParagraphsService) {}

  @Get()
  findAll(
    @CurrentUser('sub') userId: number,
    @Query('projectId', new ParseIntPipe({ optional: true })) projectId?: number,
  ) {
    return this.paragraphsService.findAll(userId, projectId);
  }

  @Get(':id')
  findOne(
    @Param('id', ParseIntPipe) id: number,
    @CurrentUser('sub') userId: number,
  ) {
    return this.paragraphsService.findOne(id, userId);
  }

  @Post()
  create(
    @Body() createDto: CreateParagraphDto,
    @CurrentUser('sub') userId: number,
  ) {
    return this.paragraphsService.create(createDto, userId);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateDto: UpdateParagraphDto,
    @CurrentUser('sub') userId: number,
  ) {
    return this.paragraphsService.update(id, updateDto, userId);
  }

  @Delete(':id')
  delete(
    @Param('id', ParseIntPipe) id: number,
    @CurrentUser('sub') userId: number,
  ) {
    return this.paragraphsService.delete(id, userId);
  }
}
