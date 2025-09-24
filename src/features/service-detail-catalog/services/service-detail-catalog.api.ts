import { apiFetch } from "@/config/api";
import {  ServiceDetailCatalogCreate, ServiceDetailCatalogListResponse, ServiceDetailCatalogResponse, ServiceDetailCatalogUpdate } from "../types/service-detail-catalog.types";

export default function ServiceDetailCatalogApi() {
    const get = async () => {
        const response = await apiFetch<ServiceDetailCatalogListResponse>("/service-detail-catalog");
        return response.data;
    };

    const create = async (model: ServiceDetailCatalogCreate) => {
        const response = await apiFetch<ServiceDetailCatalogResponse>("/service-detail-catalog", {
            method: "POST",
            body: JSON.stringify(model)
        });
        return response.data;
    };

    const update = async (id: number, model: ServiceDetailCatalogUpdate) => {
        const response = await apiFetch<ServiceDetailCatalogResponse>(`/service-detail-catalog/${id}`, {
            method: "PATCH",
            body: JSON.stringify(model)
        });
        return response.data;
    };

    const deleteModel = async (id: number) => {
        const response = await apiFetch<ServiceDetailCatalogResponse>(`/service-detail-catalog/${id}`, {
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
  
