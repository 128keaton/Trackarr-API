export interface Notification {
    Severity: string;
    Source: string;
    Code: string;
    Message: string;
    LocalizedMessage: string;
}

export interface Version {
    ServiceId: string;
    Major: number;
    Intermediate: number;
    Minor: number;
}

export interface Notification2 {
    Severity: string;
    Source: string;
    Code: string;
    Message: string;
    LocalizedMessage: string;
}

export interface Notification3 {
    Severity: string;
    Source: string;
    Code: string;
    Message: string;
    LocalizedMessage: string;
}

export interface Location {
    City: string;
    StateOrProvinceCode: string;
    CountryCode: string;
    CountryName: string;
    Residential: boolean;
}

export interface AncillaryDetails {
    Reason: string;
    ReasonDescription: string;
}

export interface StatusDetail {
    CreationTime: Date;
    Code: string;
    Description: string;
    Location: Location;
    AncillaryDetails?: [AncillaryDetails];
}

export interface PackageIdentifier {
    Type: string;
    Value: string;
}

export interface OtherIdentifier {
    PackageIdentifier: PackageIdentifier;
}

export interface Service {
    Type: string;
    Description: string;
    ShortDescription: string;
}

export interface PackageWeight {
    Units: string;
    Value: string;
}

export interface ShipperAddress {
    City: string;
    StateOrProvinceCode: string;
    CountryCode: string;
    CountryName: string;
    Residential: boolean;
}

export interface OriginLocationAddress {
    City: string;
    StateOrProvinceCode: string;
    CountryCode: string;
    CountryName: string;
    Residential: boolean;
}

export interface LastUpdatedDestinationAddress {
    City: string;
    StateOrProvinceCode: string;
    CountryCode: string;
    CountryName: string;
    Residential: boolean;
}

export interface DestinationAddress {
    City: string;
    StateOrProvinceCode: string;
    CountryCode: string;
    CountryName: string;
    Residential: boolean;
}

export interface DeliveryOptionEligibilityDetail {
    Option: string;
    Eligibility: string;
}

export interface Address {
    City: string;
    StateOrProvinceCode: string;
    PostalCode: string;
    CountryCode: string;
    CountryName: string;
    Residential: boolean;
}

export interface Event {
    Timestamp: Date;
    EventType: string;
    EventDescription: string;
    Address: Address;
    ArrivalLocation: string;
    StatusExceptionCode?: string;
    StatusExceptionDescription?: string;
}

export interface TrackDetail {
    Notification: Notification3;
    TrackingNumber: string;
    TrackingNumberUniqueIdentifier: string;
    StatusDetail: StatusDetail;
    ServiceCommitMessage: string;
    DestinationServiceArea: string;
    CarrierCode: string;
    OperatingCompanyOrCarrierDescription: string;
    OtherIdentifiers: OtherIdentifier[];
    Service: Service;
    PackageWeight: PackageWeight;
    Packaging: string;
    PackagingType: string;
    PackageSequenceNumber: string;
    PackageCount: string;
    ShipperAddress: ShipperAddress;
    OriginLocationAddress: OriginLocationAddress;
    ShipTimestamp: Date;
    LastUpdatedDestinationAddress: LastUpdatedDestinationAddress;
    DestinationAddress: DestinationAddress;
    DeliveryAttempts: string;
    TotalUniqueAddressCountInConsolidation: string;
    DeliveryOptionEligibilityDetails: DeliveryOptionEligibilityDetail[];
    Events: Event[];
}

export interface CompletedTrackDetail {
    HighestSeverity: string;
    Notifications: Notification2[];
    DuplicateWaybill: boolean;
    MoreData: boolean;
    TrackDetailsCount: string;
    TrackDetails: TrackDetail[];
}
