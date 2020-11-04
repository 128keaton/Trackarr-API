import {Module} from '@nestjs/common';
import {UpsService} from './ups.service';
import {UpsController} from './ups.controller';

@Module({
    providers: [UpsService],
    controllers: [UpsController],
    exports: [UpsService]
})
export class UpsModule {
}
