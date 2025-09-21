export interface ToolCatalog {
    id: number;
    name: string;
    description?: string;
    photo?: string;
    state: number; 
    created_at: string;
    updated_at: string;
}

export const ToolCatalogInitial: ToolCatalogCreate = {
    name: "",
    description: "",
    photo: "",
    state: 1
};

export type ToolCatalogCreate = Omit<ToolCatalog, 'id' | 'created_at' | 'updated_at'>;
 
export type ToolCatalogUpdate = Partial<ToolCatalogCreate>;

export interface ToolCatalogListResponse {
    data: ToolCatalog[];
    meta: {
        timestamp: string;
        path : string;
    };
}

export interface ToolCatalogResponse {
    data: ToolCatalog;
    meta: {
        timestamp: string;
        path : string;
    };
}