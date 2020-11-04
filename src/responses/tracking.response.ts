import {ApiProperty} from "@nestjs/swagger";
import {TrackingHistoryEntry} from "../models/tracking-history-entry.model";

export class TrackingResponse {
    @ApiProperty()
    trackingNumber: string;

    @ApiProperty()
    carrier: string;

    @ApiProperty()
    summary: string;

    @ApiProperty()
    lastLocation: string;

    @ApiProperty()
    lastStatus: string;

    @ApiProperty({type: TrackingHistoryEntry, isArray: true})
    history: TrackingHistoryEntry[];

    @ApiProperty()
    locations: string[];

    constructor(carrier: string) {
        this.carrier = carrier;
        this.history = [];
        this.locations = [];
    }

    setHistoryItem(date: string, status: string) {
        this.history.push({
            date,
            status
        })
    }

    addLocation(location: string) {
        this.locations.push(location);
    }
}
