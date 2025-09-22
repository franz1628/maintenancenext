export interface ServiceDetail {
    id: number;
    id_service: number;
    id_service_detail_catalog: number;
    id_mecanic: number;
    quantity: number;
    price: number;
    total: number;
    photo: string;
    observations: string;
    status: number;
    state: number;
    created_at: string;
    updated_at: string;

}

export const ServiceDetailInitial: ServiceDetailCreate = {
    id_service: 0,
    id_service_detail_catalog: 0,
    id_mecanic: 0,
    quantity: 0,
    price: 0,
    total: 0,
    photo: '',
    observations: '',
    status: 0,
    state: 1,
};

export type ServiceDetailCreate = Omit<ServiceDetail, 'id' | 'created_at' | 'updated_at'>;
 
export type ServiceDetailUpdate = Partial<ServiceDetailCreate>;

export interface ServiceDetailListResponse {
    data: ServiceDetail[];
    meta: {
        timestamp: string;
        path : string;
    };
}

export interface ServiceDetailResponse {
    data: ServiceDetail;
    meta: {
        timestamp: string;
        path : string;
    };
}