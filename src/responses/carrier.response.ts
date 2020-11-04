import {ApiProperty} from "@nestjs/swagger";

export class CarrierResponse {
    @ApiProperty()
    carrier: string;
}
