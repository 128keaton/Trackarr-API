import {ClassSerializerInterceptor, Controller, Get, Query, UseInterceptors} from '@nestjs/common';
import {ApiQuery} from "@nestjs/swagger";
import {UpsService} from "./ups.service";

@Controller('ups')
export class UpsController {

    constructor(private service: UpsService) {
    }

    @Get('track')
    @ApiQuery({type: String, name: 'trackingNumber', description: 'Tracking number of package to track', example: '1Z12345E0390105056'})
    @UseInterceptors(ClassSerializerInterceptor)
    trackPackage(@Query('trackingNumber') trackingNumber) {
        return this.service.trackPackage(trackingNumber);
    }
}
