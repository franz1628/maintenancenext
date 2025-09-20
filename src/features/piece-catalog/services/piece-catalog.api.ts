import { apiFetch } from "@/config/api";
import {  PieceCatalogCreate, PieceCatalogListResponse, PieceCatalogResponse, PieceCatalogUpdate } from "../types/piece-catalog.types";

export default function PieceCatalogApi() {
    const get = async () => {
        const response = await apiFetch<PieceCatalogListResponse>("/piece-catalog");
        return response.data;
    };

    const create = async (model: PieceCatalogCreate) => {
        const response = await apiFetch<PieceCatalogResponse>("/piece-catalog", {
            method: "POST",
            body: JSON.stringify(model)
        });
        return response.data;
    };

    const update = async (id: number, model: PieceCatalogUpdate) => {
        const response = await apiFetch<PieceCatalogResponse>(`/piece-catalog/${id}`, {
            method: "PATCH",
            body: JSON.stringify(model)
        });
        return response.data;
    };

    const deleteModel = async (id: number) => {
        const response = await apiFetch<PieceCatalogResponse>(`/piece-catalog/${id}`, {
            method: "DELETE"
        });

        return response.data;
    };

    return {
        get,
        create,
        update,
        deleteModel
    };
}
  
