export interface UspsTrackingResponse {
    TrackResponse: {
        TrackInfo: {
            ID: string,
            TrackSummary: string,
            TrackDetail: Array<string>
        }
    }
}
