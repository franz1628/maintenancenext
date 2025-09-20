import { Model } from "@/features/model/types/model.types";
import { User } from "@/features/user/types/user.types";

export interface Vehicle {
    id: number;
    plate: string;
    color?: string;
    id_user: number;
    id_model: number;
    kilometers?: number;
    state: number;
    created_at: string;
    updated_at: string;
    users : User;
    model : Model;
}

export const VehicleInitial: VehicleCreate = {
    plate: '',
    color: '',
    id_user: 0,
    id_model: 0,
    kilometers: 0,
    state: 1
};

export type VehicleCreate = Omit<Vehicle, 'id' | 'created_at' | 'updated_at' | 'users' | 'model'>;
 
export type VehicleUpdate = Partial<VehicleCreate>;

export interface VehicleListResponse {
    data: Vehicle[];
    meta: {
        timestamp: string;
        path : string;
    };
}

export interface VehicleResponse {
    data: Vehicle;
    meta: {
        timestamp: string;
        path : string;
    };
}