import { Module } from '@nestjs/common';
import { ParagraphsService } from './paragraphs.service.js';
import { ParagraphsController } from './paragraphs.controller.js';
import { AuthModule } from '../auth/auth.module.js';

@Module({
  imports: [AuthModule],
  controllers: [ParagraphsController],
  providers: [ParagraphsService],
})
export class ParagraphsModule {}
