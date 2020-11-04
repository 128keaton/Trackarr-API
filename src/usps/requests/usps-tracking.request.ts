import {toXml} from "xml2json";
import {classToPlain} from "class-transformer";

export class UspsTrackingRequest {
    TrackRequest: {
        USERID: string,
        TrackID: [{ID: string}]
    };

    constructor(userID: string, trackingNumber: string) {
        this.TrackRequest = {
            USERID: userID,
            TrackID: [{ID: trackingNumber}]
        }
    }

    getXML() {
        return toXml(classToPlain(this));
    }

}
