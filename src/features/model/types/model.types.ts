import { Brand } from "@/features/brand/types/brand.types";

export interface Model {
    id: number;
    name: string;
    description?: string;
    id_brand: number;
    state: number;
    created_at: string;
    updated_at: string;
    brand: Brand;
}

export const ModelInitial: ModelCreate = {
    name: '',
    description: '',
    id_brand: 0,
    state: 1,
};

export type ModelCreate = Omit<Model, 'id' | 'created_at' | 'updated_at' | 'brand'>;
 
export type ModelUpdate = Partial<ModelCreate>;

export interface ModelListResponse {
    data: Model[];
    meta: {
        timestamp: string;
        path : string;
    };
}

export interface ModelResponse {
    data: Model;
    meta: {
        timestamp: string;
        path : string;
    };
}