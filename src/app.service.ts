import {Injectable} from '@nestjs/common';
import TrackingNumberVerification = require('tracking-number-validation');
import {Helpers} from "./helpers";

@Injectable()
export class AppService {
    getCarrier(trackingNumber: string): string {
        const carrierResponse: [string] = TrackingNumberVerification.getCourier(trackingNumber);

        if (!!carrierResponse && carrierResponse.length > 0) {
            return Helpers.titleizeWord(carrierResponse[0]);
        }

        return 'Unknown'
    }
}
