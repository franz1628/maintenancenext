import { apiFetch } from "@/config/api";
import {  ServiceCreate, ServiceListResponse, ServiceResponse, ServiceUpdate } from "../types/service.types";

export default function ServiceApi() {
    const get = async () => {
        const response = await apiFetch<ServiceListResponse>("/service");
        return response.data;
    };

    const create = async (model: ServiceCreate) => {
        const response = await apiFetch<ServiceResponse>("/service", {
            method: "POST",
            body: JSON.stringify(model)
        });
        return response.data;
    };

    const update = async (id: number, model: ServiceUpdate) => {
        const response = await apiFetch<ServiceResponse>(`/service/${id}`, {
            method: "PATCH",
            body: JSON.stringify(model)
        });
        return response.data;
    };

    const deleteModel = async (id: number) => {
        const response = await apiFetch<ServiceResponse>(`/service/${id}`, {
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
  
