import {Injectable} from '@nestjs/common';
import FedExAPI = require('fedex');
import {FedExTrackingRequest} from "./requests/fedex-tracking.request";
import {FedExTrackingResponse} from "./responses/fedex-tracking.response";
import {TrackingResponse} from "../responses/tracking.response";
import {Helpers} from "../helpers";

@Injectable()
export class FedExService {

    private fedex;

    constructor() {
        this.fedex = new FedExAPI({
            environment: 'sandbox',
            debug: true,
            key: String(process.env.FEDEX_KEY),
            password: String(process.env.FEDEX_PASSWORD),
            account_number: String(process.env.FEDEX_ACCOUNT_NUMBER),
            meter_number: String(process.env.FEDEX_METER_NUMBER),
            imperial: true
        })
    }


    trackPackage(trackingNumber: string): Promise<TrackingResponse> {
        const request = new FedExTrackingRequest(trackingNumber);

        return new Promise(resolve => {
                this.fedex.track({...request, ProcessingOptions: 'INCLUDE_DETAILED_SCANS'}, (err, res) => {
                    if (err) {
                        resolve(err)
                    }

                    resolve(FedExService.parseFedExResponse(res));
                })
            }
        )
    }

    private static parseFedExResponse(fedexResponse: FedExTrackingResponse) {
        const response = new TrackingResponse('FedEx');

        if (!!fedexResponse.CompletedTrackDetails && fedexResponse.CompletedTrackDetails.length > 0) {
            const trackingDetails = fedexResponse.CompletedTrackDetails[0].TrackDetails[0];

            response.trackingNumber = trackingDetails.TrackingNumber;


            trackingDetails.Events.forEach(event => {
                if (!!event.Address && !!event.Address.City && !!event.Address.StateOrProvinceCode) {
                    const eventDate = Helpers.getFormattedDate(new Date(event.Timestamp));
                    const city = Helpers.titleizeWord(event.Address.City.replace('FEDEX SMARTPOST ', '').toLowerCase());

                    response.addLocation(`${city}, ${event.Address.StateOrProvinceCode}`);
                    response.setHistoryItem(eventDate, event.EventDescription);
                }
            });

            if (!!trackingDetails.StatusDetail.AncillaryDetails && !!trackingDetails.StatusDetail.AncillaryDetails[0]) {
                response.lastStatus = trackingDetails.StatusDetail.AncillaryDetails[0].ReasonDescription;
            } else if (response.history.length > 0) {
                response.lastStatus = response.history[0].status;
            } else {
                response.lastStatus = trackingDetails.StatusDetail.Description;
            }

            if (response.locations.length > 0) {
                response.lastLocation = response.locations[0]
            }

        }

        return response;
    }


}
