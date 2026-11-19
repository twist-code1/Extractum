import { Module } from '@nestjs/common';
import { createObserveModule } from '@nestjs/observe';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { EngineModule } from './engine/engine.module.js';
import { ProjectsModule } from './projects/projects.module.js';
import { ParagraphsModule } from './paragraphs/paragraphs.module.js';

export const { ObserveModule, ObserveInstrument } = createObserveModule();

@Module({
  imports: [
    ObserveModule.forRoot({
      appKey: process.env.OBSERVE_APP_KEY ?? 'YOUR_APP_KEY',
      appSecret: process.env.OBSERVE_APP_SECRET ?? 'YOUR_APP_SECRET',
      serviceId: 'backend',
    }),
    EngineModule,
    ProjectsModule,
    ParagraphsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
