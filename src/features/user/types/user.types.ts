import { DocumentType } from "@/features/document-type/types/document-type.types";

export interface User {
    id: number;
    name: string;
    last_name: string;
    second_last_name?: string;
    email: string;
    password: string;
    birth_date: string;
    phone?: string;
    number_document: string;
    id_document_type: number;
    state: number;
    created_at: string;
    updated_at: string;
    document_type:DocumentType
}

export const UserInitial: UserCreate = {
    name: '',
    last_name: '',
    second_last_name: '',
    email: '',
    password: '',
    birth_date: '',
    phone: '',
    number_document: '',
    id_document_type: 0,
    state: 1,
};

export type UserCreate = Omit<User, 'id' | 'created_at' | 'updated_at' | 'document_type'>;
 
export type UserUpdate = Partial<UserCreate>;

export interface UserListResponse {
    data: User[];
    meta: {
        timestamp: string;
        path : string;
    };
}

export interface UserResponse {
    data: User;
    meta: {
        timestamp: string;
        path : string;
    };
}