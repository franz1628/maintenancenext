export interface ServiceCatalog {
    id: number;
    name: string;
    description: string;
    price: string;
    duration_minutes: number;
    state: number;
    created_at: string;
    updated_at: string;
}

export const ServiceCatalogInitial: ServiceCatalogCreate = {
    name: '',
    description: '',
    price: 0,
    duration_minutes: 0,
    state: 1
};

export interface ServiceCatalogCreate {
    name: string;
    description: string;
    price: number;
    duration_minutes: number;
    state: number;
};
 
export type ServiceCatalogUpdate = Partial<ServiceCatalogCreate>;

export interface ServiceCatalogListResponse {
    data: ServiceCatalog[];
    meta: {
        timestamp: string;
        path : string;
    };
}

export interface ServiceCatalogResponse {
    data: ServiceCatalog;
    meta: {
        timestamp: string;
        path : string;
    };
}