import { PieceCatalog } from "@/features/piece-catalog/types/piece-catalog.types";
import { ServiceCatalog } from "@/features/service-catalog/types/service-catalog.types";

export interface ServiceDetailCatalog {
    id: number;
    id_service_catalog: number;
    id_piece_catalog: number;
    id_tool_catalog: number;
    description: string;
    duration_minutes: number;
    state: number;
    created_at: string;
    updated_at: string;
    service_catalog : ServiceCatalog;
    piece_catalog? : PieceCatalog;
    tool_catalog? : PieceCatalog;
}

export const ServiceDetailCatalogInitial: ServiceDetailCatalogCreate = {
    id_service_catalog: 0,
    id_piece_catalog: 0,
    id_tool_catalog: 0,
    description: '',
    duration_minutes: 0,
    state: 1
};

export type ServiceDetailCatalogCreate = Omit<ServiceDetailCatalog, 'id' | 'created_at' | 'updated_at' | 'service_catalog' | 'piece_catalog' | 'tool_catalog'>;
 
export type ServiceDetailCatalogUpdate = Partial<ServiceDetailCatalogCreate>;

export interface ServiceDetailCatalogListResponse {
    data: ServiceDetailCatalog[];
    meta: {
        timestamp: string;
        path : string;
    };
}

export interface ServiceDetailCatalogResponse {
    data: ServiceDetailCatalog;
    meta: {
        timestamp: string;
        path : string;
    };
}