import { DocumentType } from "@/features/document-type/types/document-type.types";

export interface Mecanic {
    id: number;
    name: string;
    last_name: string;  
    second_last_name?: string;
    email: string;
    password: string;
    id_document_type: number;
    number_document: string;
    phone?: string;
    photo?: string;
    birth_date?: string;
    address?: string;
    experience_years?: number;
    certifications?: string;
    state: number;
    created_at: string;
    updated_at: string;
    document_type?: DocumentType;
}

export const MecanicInitial: MecanicCreate = {
    name: '',
    last_name: '',  
    second_last_name: '',
    email: '',
    password: '',
    id_document_type: 0,
    number_document: '',
    phone: '',
    photo: '',
    birth_date: '',
    address: '',
    experience_years: 0,
    certifications: '',
    state: 1
};

export type MecanicCreate = Omit<Mecanic, 'id' | 'created_at' | 'updated_at' | 'document_type'>;
 
export type MecanicUpdate = Partial<MecanicCreate>;

export interface MecanicListResponse {
    data: Mecanic[];
    meta: {
        timestamp: string;
        path : string;
    };
}

export interface MecanicResponse {
    data: Mecanic;
    meta: {
        timestamp: string;
        path : string;
    };
}