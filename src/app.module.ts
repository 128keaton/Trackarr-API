import {Module} from '@nestjs/common';
import {AppController} from './app.controller';
import {AppService} from './app.service';
import {UspsModule} from './usps/usps.module';
import {ConfigModule} from "@nestjs/config";
import { FedExModule } from './fedex/fedex.module';
import { UpsModule } from './ups/ups.module';

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
        }),
        UspsModule,
        FedExModule,
        UpsModule
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {
}
