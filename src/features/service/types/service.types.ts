import { Seller } from "@/features/seller/types/seller.types";
import { ServiceCatalog } from "@/features/service-catalog/types/service-catalog.types";
import { User } from "@/features/user/types/user.types";
import { Vehicle } from "@/features/vehicle/types/vehicle.types";

export interface Service {
    id: number;
    id_vehicle: number;
    id_user: number;
    id_service_catalog: number;
    id_seller: number;
    date_service: string;
    total: string;
    status: string;
    observations?: string;
    state: number;
    date_initial?: string;
    date_final?: string;
    created_at: string;
    updated_at: string;
    vehicle: Vehicle;
    users: User;
    service_catalog: ServiceCatalog;
    seller: Seller;
}

export const ServiceInitial: ServiceCreate = {
    id_vehicle: 0,
    id_user: 0,
    id_service_catalog: 0,
    id_seller: 0,
    date_service: new Date().toISOString(),
    total: 0,
    status: '',
    observations: '',
    state: 1,
    date_initial: new Date().toISOString(),
    date_final: new Date().toISOString(),
};

export interface ServiceCreate {
    id_vehicle: number;
    id_user: number;
    id_service_catalog: number;
    id_seller: number;
    date_service: string;
    total: number;  
    status: string;
    observations?: string;
    state: number;
    date_initial?: string;
    date_final?: string;
}
 
export type ServiceUpdate = Partial<ServiceCreate>;

export interface ServiceListResponse {
    data: Service[];
    meta: {
        timestamp: string;
        path : string;
    };
}

export interface ServiceResponse {
    data: Service;
    meta: {
        timestamp: string;
        path : string;
    };
}