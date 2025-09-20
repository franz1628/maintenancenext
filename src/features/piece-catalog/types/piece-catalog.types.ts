export interface PieceCatalog {
    id: number;
    name: string;
    description?: string;
    price: string;
    stock: number;
    state: number;
    created_at: string;
    updated_at: string;
}

export const PieceCatalogInitial: PieceCatalogCreate = {
    name: '',
    description: '',
    price: 0.00,
    stock: 0,
    state: 1,
};

export interface PieceCatalogCreate {
  name: string;
  description?: string;
  price: number;
  stock: number;
  state: number;
}
 
export type PieceCatalogUpdate = Partial<PieceCatalogCreate>;

export interface PieceCatalogListResponse {
    data: PieceCatalog[];
    meta: {
        timestamp: string;
        path : string;
    };
}

export interface PieceCatalogResponse {
    data: PieceCatalog;
    meta: {
        timestamp: string;
        path : string;
    };
}