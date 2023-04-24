import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { FlaskService } from './flask/flask.service';
import { PredictionModule } from './prediction/prediction.module';

@Module({
  imports: [PredictionModule],
  controllers: [AppController],
  providers: [AppService, FlaskService],
})
export class AppModule {}
