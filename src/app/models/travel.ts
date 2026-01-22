export interface Travel {
    id: number,
    distance: number, 
    consommation: number,
    co2: number,
    travelType: TravelType
    date: Date,
    userId: number
}

export type TravelType = "car" | "plane" | "train";
