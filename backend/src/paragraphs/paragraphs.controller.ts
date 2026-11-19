import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe } from '@nestjs/common';
import { ParagraphsService } from './paragraphs.service.js';
import { CreateParagraphDto } from './dto/create-paragraph.dto.js';
import { UpdateParagraphDto } from './dto/update-paragraph.dto.js';

@Controller('paragraphs')
export class ParagraphsController {
  constructor(private readonly paragraphsService: ParagraphsService) {}
  @Get()
  findAll(){
    return this.paragraphsService.findAll()
  }
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number){
    return this.paragraphsService.findOne(id)
  }
  @Post()
  create(@Body() createDto: CreateParagraphDto){
    return this.paragraphsService.create(createDto)
  }
  @Delete(':id')
  delete(@Param('id', ParseIntPipe) id: number){
    return this.paragraphsService.delete(id)
  }
}
