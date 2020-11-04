export interface Response {
    ResponseStatusCode: string;
    ResponseStatusDescription: string;
}

export interface ShipmentType {
    Code: string;
    Description: string;
}

export interface Shipper {
    ShipperNumber: string;
}

export interface Address {
    AddressLine1: string;
    AddressLine2: string;
    City: string;
    StateProvinceCode: string;
    PostalCode: string;
    CountryCode: string;
}

export interface ShipTo {
    Address: Address;
}

export interface Service {
    Code: string;
    Description: string;
}

export interface ReferenceNumber {
    Code: string;
    Value: string;
}

export interface EstimatedDeliveryWindow {
    Date: string;
    StartTime: string;
    EndTime: string;
}

export interface Address2 {
    City: string;
    StateProvinceCode: string;
    PostalCode: string;
    CountryCode: string;
}

export interface ActivityLocation {
    Address: Address2;
    Code: string;
    Description: string;
    SignedForByName: string;
}

export interface StatusType {
    Code: string;
    Description: string;
}

export interface StatusCode {
    Code: string;
}

export interface Status {
    StatusType: StatusType;
    StatusCode: StatusCode;
}

export interface Activity {
    ActivityLocation: ActivityLocation;
    Status: Status;
    Date: string;
    Time: string;
    GMTDate: string;
    GMTTime: string;
    GMTOffset: string;
}

export interface UnitOfMeasurement {
    Code: string;
}

export interface PackageWeight {
    UnitOfMeasurement: UnitOfMeasurement;
    Weight: string;
}

export interface ReferenceNumber2 {
    Code: string;
    Value: string;
}

export interface Package {
    TrackingNumber: string;
    EstimatedDeliveryWindow: EstimatedDeliveryWindow;
    Activity: Activity[];
    PackageWeight: PackageWeight;
    ReferenceNumber: ReferenceNumber2[];
}

export interface Shipment {
    ShipmentType: ShipmentType;
    Shipper: Shipper;
    ShipTo: ShipTo;
    Service: Service;
    ReferenceNumber: ReferenceNumber;
    ShipmentIdentificationNumber: string;
    PickupDate: string;
    Package: Package;
}
