import { apiFetch } from "@/config/api";
import {  ServiceCatalogCreate, ServiceCatalogListResponse, ServiceCatalogResponse, ServiceCatalogUpdate } from "../types/service-catalog.types";

export default function ServiceCatalogApi() {
    const get = async () => {
        const response = await apiFetch<ServiceCatalogListResponse>("/service-catalog");
        return response.data;
    };

    const create = async (model: ServiceCatalogCreate) => {
        const response = await apiFetch<ServiceCatalogResponse>("/service-catalog", {
            method: "POST",
            body: JSON.stringify(model)
        });
        return response.data;
    };

    const update = async (id: number, model: ServiceCatalogUpdate) => {
        const response = await apiFetch<ServiceCatalogResponse>(`/service-catalog/${id}`, {
            method: "PATCH",
            body: JSON.stringify(model)
        });
        return response.data;
    };

    const deleteModel = async (id: number) => {
        const response = await apiFetch<ServiceCatalogResponse>(`/service-catalog/${id}`, {
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
  
