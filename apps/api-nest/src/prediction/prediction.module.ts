import { Module } from '@nestjs/common';
import { PredictionController } from './prediction.controller';

@Module({
  controllers: [PredictionController],
})
export class PredictionModule {}
