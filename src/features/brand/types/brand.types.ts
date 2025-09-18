export interface Brand {
    id: number;
    name: string;
    description?: string;
    logo?: string;
    state: number;
    created_at: string;
    updated_at: string;
}

export const BrandInitial: BrandCreate = {
    name: '',
    description: '',
    logo: '',
    state: 1,
};

export type BrandCreate = Omit<Brand, 'id' | 'created_at' | 'updated_at'>;
 
export type BrandUpdate = Partial<BrandCreate>;

export interface BrandListResponse {
    data: Brand[];
    meta: {
        timestamp: string;
        path : string;
    };
}

export interface BrandResponse {
    data: Brand;
    meta: {
        timestamp: string;
        path : string;
    };
}