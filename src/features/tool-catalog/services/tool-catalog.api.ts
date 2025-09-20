import { apiFetch } from "@/config/api";
import {  ToolCatalogCreate, ToolCatalogListResponse, ToolCatalogResponse, ToolCatalogUpdate } from "../types/tool-catalog.types";

export default function ToolCatalogApi() {
    const get = async () => {
        const response = await apiFetch<ToolCatalogListResponse>("/tool-catalog");
        return response.data;
    };

    const create = async (model: ToolCatalogCreate) => {
        const response = await apiFetch<ToolCatalogResponse>("/tool-catalog", {
            method: "POST",
            body: JSON.stringify(model)
        });
        return response.data;
    };

    const update = async (id: number, model: ToolCatalogUpdate) => {
        const response = await apiFetch<ToolCatalogResponse>(`/tool-catalog/${id}`, {
            method: "PATCH",
            body: JSON.stringify(model)
        });
        return response.data;
    };

    const deleteModel = async (id: number) => {
        const response = await apiFetch<ToolCatalogResponse>(`/tool-catalog/${id}`, {
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
  
