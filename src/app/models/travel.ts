export interface Travel {
    distanceKm: number, 
    consumptionPer100Km: number,
    quantityCO2: number,
    type: TravelType
}

export type TravelType = "car" | "plane" | "train";
