import {HttpService, Injectable} from '@nestjs/common';
import {toJson} from "xml2json";
import {UspsTrackingResponse} from "./responses/usps-tracking.response";
import {TrackingResponse} from "../responses/tracking.response";
import {Helpers} from "../helpers";
import {UspsTrackingRequest} from "./requests/usps-tracking.request";

@Injectable()
export class UspsService {
    private BASE_TRACKING_URI = 'http://production.shippingapis.com/ShippingAPI.dll?API=TrackV2';

    constructor(private httpService: HttpService) {
    }

    async trackPackage(trackingNumber: string): Promise<TrackingResponse> {
        // Build a request to USPS's Package Tracking API
        const request = new UspsTrackingRequest(process.env.USPS_USER_ID, trackingNumber);

        // Create a response object for later
        const response = new TrackingResponse('USPS');

        // Raw XML from UspsTrackingRequest
        const xml = request.getXML();

        // Get the data response
        const {data} = await this.httpService.get(`${this.BASE_TRACKING_URI}&XML=${encodeURIComponent(xml)}`).toPromise();

        // Parse the XML into a UspsTrackingResponse interface
        const parsed: UspsTrackingResponse = JSON.parse(toJson(data));

        // Set the summary from the parsed response
        response.summary = parsed.TrackResponse.TrackInfo.TrackSummary;

        // Set the tracking number from the parsed response
        response.trackingNumber = parsed.TrackResponse.TrackInfo.ID;

        if (parsed.TrackResponse.TrackInfo.TrackSummary.includes('could not locate')) {
            return this.trackPackage('92' + trackingNumber);
        }

        console.log(JSON.stringify(parsed));

        // Iterate through the tracking history for more details
        parsed.TrackResponse.TrackInfo.TrackDetail.forEach(detail => {
            // Matches mm/dd/yy
            const dateMatch = detail.match(/(0[1-9]|1[012])[- /.](0[1-9]|[12][0-9]|3[01])[- /.](19|20)\d\d/i);

            // Matches hh:mm am/pm
            const timeMatch = detail.match(/\b((1[0-2]|0?[1-9]):([0-5][0-9]) ([AaPp][Mm]))/i);


            // Check if we have a match for the date regex
            if (!!dateMatch) {
                // Remove the date we matched from the status
                let date = dateMatch[0];
                let status = detail.replace(`, ${date}`, '');


                // Check if we have a match for the time regex
                if (!!timeMatch) {
                    // Add the time to our string date
                    date = `${date} at ${timeMatch[0]}`;

                    // Remove the time we matched from the status
                    status = status.replace(`, ${timeMatch[0]}`, '')
                }

                const splitStatus = status.split(', ');

                // Check if our detail item contains something like ', DETROIT MI DISTRIBUTION CENTER'
                if (splitStatus.length > 1) {

                    // Remove the extra distribution network items and split the city name from the state
                    const rawLocation = splitStatus[1].replace(' NETWORK DISTRIBUTION CENTER', '')
                                                      .replace(' DISTRIBUTION CENTER', '')
                                                      .split(' ');


                    // Titleize the city name after changing it to lowercase. MEMPHIS -> memphis -> Memphis
                    const cityName = Helpers.titleizeWord(rawLocation[0].toLowerCase());
                    const state = rawLocation[1];

                    response.addLocation(`${cityName}, ${state}`);
                    response.setHistoryItem(date, splitStatus[0]);

                } else {
                    response.setHistoryItem(date, status);
                }
            }

        });

        if (response.history.length > 0) {
            response.lastStatus =  response.history[0].status;
        }

        if (response.locations.length > 0) {
            response.lastLocation = response.locations[0]
        }

        return response;
    }

}
