import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { FlaskService } from './flask/flask.service';
import { PredictionModule } from './prediction/prediction.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.env.local', '.env.staging', '.env'],
    }),
    PredictionModule,
  ],
  controllers: [AppController],
  providers: [AppService, FlaskService],
})
export class AppModule {}
