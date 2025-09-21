import { DocumentType } from "@/features/document-type/types/document-type.types";

export interface Seller {
    id: number;
    name: string;
    last_name: string;
    second_last_name?: string;
    email: string;
    password: string;
    birth_date: string;
    phone?: string;
    photo?: string;
    address?: string;
    number_document: string;
    id_document_type: number;
    state: number;
    created_at: string;
    updated_at: string;
    document_type:DocumentType
}

export const SellerInitial: SellerCreate = {
    name: '',
    last_name: '',
    second_last_name: '',
    email: '',
    password: '',
    birth_date: '',
    phone: '',
    photo: '',
    address: '',
    number_document: '',
    id_document_type: 0,
    state: 1,
};

export type SellerCreate = Omit<Seller, 'id' | 'created_at' | 'updated_at' | 'document_type'>;
 
export type SellerUpdate = Partial<SellerCreate>;

export interface SellerListResponse {
    data: Seller[];
    meta: {
        timestamp: string;
        path : string;
    };
}

export interface SellerResponse {
    data: Seller;
    meta: {
        timestamp: string;
        path : string;
    };
}