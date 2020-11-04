import {HttpModule, Module} from '@nestjs/common';
import {UspsController} from './usps.controller';
import {UspsService} from './usps.service';

@Module({
    imports: [HttpModule],
    controllers: [UspsController],
    providers: [UspsService],
    exports: [UspsService]
})
export class UspsModule {
}
