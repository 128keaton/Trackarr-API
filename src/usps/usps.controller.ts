import {ClassSerializerInterceptor, Controller, Get, Query, UseInterceptors} from '@nestjs/common';
import {UspsService} from "./usps.service";
import {ApiExtraModels, ApiQuery, ApiResponse} from "@nestjs/swagger";
import {TrackingResponse} from "../responses/tracking.response";

@Controller('usps')
@ApiExtraModels(TrackingResponse)
export class UspsController {
    constructor(private service: UspsService) {
    }

    @Get('track')
    @ApiQuery({type: String, name: 'trackingNumber', description: 'Tracking number of package to track', example: '9400108205496803095803'})
    @UseInterceptors(ClassSerializerInterceptor)
    @ApiResponse({type: TrackingResponse, description: 'Tracking response', status: 200})
    trackPackage(@Query('trackingNumber') trackingNumber): Promise<TrackingResponse> {
        return this.service.trackPackage(trackingNumber);
    }
}
