import { Controller, Get, Post, Body, Param, Delete, ParseIntPipe } from '@nestjs/common';
import { ProjectsService } from './projects.service.js';
import { CreateProjectDto } from './dto/create-project.dto.js';
import { promiseHooks } from 'v8';

@Controller('projects')
export class ProjectsController {
  constructor(private readonly projectsService: ProjectsService) {}
  @Get()
  findAll(){
    return this.projectsService.findAll()
  }
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number){
    return this.projectsService.findOne(id)
  }
  @Post()
  create(@Body() createDto: CreateProjectDto){
    return this.projectsService.create(createDto)
  }
  @Delete(':id')
  delete(@Param('id', ParseIntPipe) id: number){
    return this.projectsService.delete(id)
  }
}
