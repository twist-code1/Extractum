import { Module } from '@nestjs/common';
import { ParagraphsService } from './paragraphs.service.js';
import { ParagraphsController } from './paragraphs.controller.js';

@Module({
  controllers: [ParagraphsController],
  providers: [ParagraphsService],
})
export class ParagraphsModule {}
