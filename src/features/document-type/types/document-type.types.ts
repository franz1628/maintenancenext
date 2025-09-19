export interface DocumentType {
    id: number;
    name: string;
    description?: string;
    state: number;
    created_at: string;
    updated_at: string;
}

export const DocumentTypeInitial: DocumentTypeCreate = {
    name: '',
    description: '',
    state: 1,
};

export type DocumentTypeCreate = Omit<DocumentType, 'id' | 'created_at' | 'updated_at'>;
 
export type DocumentTypeUpdate = Partial<DocumentTypeCreate>;

export interface DocumentTypeListResponse {
    data: DocumentType[];
    meta: {
        timestamp: string;
        path : string;
    };
}

export interface DocumentTypeResponse {
    data: DocumentType;
    meta: {
        timestamp: string;
        path : string;
    };
}