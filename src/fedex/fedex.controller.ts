import {ClassSerializerInterceptor, Controller, Get, Query, UseInterceptors} from '@nestjs/common';
import {ApiQuery} from "@nestjs/swagger";
import {FedExService} from "./fedex.service";

@Controller('fedex')
export class FedExController {

    constructor(private service: FedExService) {
    }

    @Get('track')
    @ApiQuery({type: String, name: 'trackingNumber', description: 'Tracking number of package to track', example: '122816215025810'})
    @UseInterceptors(ClassSerializerInterceptor)
    trackPackage(@Query('trackingNumber') trackingNumber) {
        return this.service.trackPackage(trackingNumber);
    }
}
