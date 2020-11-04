import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UspsModule } from './usps/usps.module';

@Module({
  imports: [UspsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
