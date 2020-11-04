import {CompletedTrackDetail, Version} from "../interfaces";

export interface FedExTrackingResponse {
    HighestSeverity: string;
    Notifications: Notification[];
    Version: Version;
    CompletedTrackDetails: CompletedTrackDetail[];
}
