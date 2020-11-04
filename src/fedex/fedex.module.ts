import { Module } from '@nestjs/common';
import { FedExController } from './fedex.controller';
import { FedExService } from './fedex.service';

@Module({
  controllers: [FedExController],
  providers: [FedExService],
  exports: [FedExService]
})
export class FedExModule {}
