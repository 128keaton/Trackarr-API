import {ClassSerializerInterceptor, Controller, Get, Query, UseInterceptors} from '@nestjs/common';
import {AppService} from './app.service';
import {ApiExtraModels, ApiQuery, ApiResponse} from "@nestjs/swagger";
import {CarrierResponse} from "./responses/carrier.response";
import {TrackingResponse} from "./responses/tracking.response";
import {UspsService} from "./usps/usps.service";
import {FedExService} from "./fedex/fedex.service";
import {UpsService} from "./ups/ups.service";
import {TrackingHistoryEntry} from "./models/tracking-history-entry.model";

@Controller()
@ApiExtraModels(TrackingHistoryEntry)
export class AppController {
    constructor(private readonly appService: AppService,
                private readonly uspsService: UspsService,
                private readonly fedExService: FedExService,
                private readonly upsService: UpsService) {
    }

    @ApiQuery({name: 'trackingNumber', type: String})
    @Get('carrier')
    getCarrier(@Query('trackingNumber') trackingNumber: string): CarrierResponse {
        return {carrier: this.appService.getCarrier(trackingNumber)};
    }

    @Get('track')
    @ApiQuery({type: String, name: 'trackingNumber', description: 'Tracking number of package to track'})
    @UseInterceptors(ClassSerializerInterceptor)
    @ApiResponse({type: TrackingResponse, description: 'Tracking response', status: 200})
    trackPackage(@Query('trackingNumber') trackingNumber): Promise<TrackingResponse> {
        if (this.appService.getCarrier(trackingNumber) === 'USPS') {
            return this.uspsService.trackPackage(trackingNumber)
        } else if (this.appService.getCarrier(trackingNumber) === 'UPS') {
            return this.upsService.trackPackage(trackingNumber)
        }

        return this.fedExService.trackPackage(trackingNumber);
    }
}
