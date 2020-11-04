import {ApiProperty} from "@nestjs/swagger";

export class TrackingHistoryEntry {
    @ApiProperty()
    date: string;

    @ApiProperty()
    status: string;
}
