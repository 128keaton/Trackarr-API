import {Injectable} from '@nestjs/common';
import upsAPI = require("ups-nodejs-sdk");
import {UPSTrackingResponse} from "./responses/ups-tracking.response";
import {TrackingResponse} from "../responses/tracking.response";
import {Helpers} from "../helpers";


@Injectable()
export class UpsService {
    private ups;

    constructor() {
        this.ups = new upsAPI({
            environment: 'sandbox',
            username: process.env.UPS_ACCOUNT,
            password: process.env.UPS_PASSWORD,
            access_key: process.env.UPS_KEY,
            imperial: true
        });
    }

    trackPackage(trackingNumber: string): Promise<TrackingResponse> {
        return new Promise(resolve => {
            this.ups.track(trackingNumber, function (err, result) {
                if (!!err) {
                    resolve(err)
                } else {
                    resolve(UpsService.parseUPSResponse(result));
                }
            });
        })
    }

    private static parseUPSResponse(upsResponse: UPSTrackingResponse) {
        const response = new TrackingResponse('UPS');
        if (!!upsResponse.Shipment && !!upsResponse.Shipment.Package && !!upsResponse.Shipment.Package.Activity) {
            response.trackingNumber = upsResponse.Shipment.ShipmentIdentificationNumber;

            const packageActivity = upsResponse.Shipment.Package.Activity;

            packageActivity.forEach(activity => {
                const year = activity.Date.substring(0, 4);
                const month = activity.Date.substring(4, 6);
                const day = activity.Date.substring(6, 8);
                const hours = activity.Time.substring(0, 2);
                const minutes = activity.Time.substring(2, 4);
                const seconds = activity.Time.substring(4, 6);
                const date = new Date(`${year}-${month}-${day}T${hours}:${minutes}:${seconds}Z`);

                const dateKey = `${month}/${day}/${year} at ${Helpers.formatAMPM(date)}`;
                response.setHistoryItem(dateKey, activity.Status.StatusType.Description);

                if (!!activity.ActivityLocation && !!activity.ActivityLocation.Address && !!activity.ActivityLocation.Address.City) {
                    const cityName = Helpers.titleizeWord(activity.ActivityLocation.Address.City.toLowerCase());
                    const stateOrProvinceCode = activity.ActivityLocation.Address.StateProvinceCode;

                    response.addLocation(`${cityName}, ${stateOrProvinceCode}`);
                }
            });
        }

        if (response.history.length > 0) {
            response.lastStatus = response.history[0].status;
            response.summary = response.lastStatus;
        }

        if (response.locations.length > 0) {
            response.lastLocation = response.locations[0]
        }

        return response;
    }
}
