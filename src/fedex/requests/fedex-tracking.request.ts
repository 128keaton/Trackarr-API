export class FedExTrackingRequest {
    SelectionDetails: {
        PackageIdentifier: {
            Type: string,
            Value: string
        }
    };

    constructor(trackingNumber: string) {
        this.SelectionDetails = {
            PackageIdentifier: {
                Type: 'TRACKING_NUMBER_OR_DOORTAG',
                Value: trackingNumber
            }
        }
    }
}
