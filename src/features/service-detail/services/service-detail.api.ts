import { apiFetch } from "@/config/api";
import {  ServiceDetailCreate, ServiceDetailListResponse, ServiceDetailResponse, ServiceDetailUpdate } from "../types/service-detail.types";

export default function ServiceDetailApi() {
    const get = async () => {
        const response = await apiFetch<ServiceDetailListResponse>("/ServiceDetail");
        return response.data;
    };

    const create = async (model: ServiceDetailCreate) => {
        const response = await apiFetch<ServiceDetailResponse>("/ServiceDetail", {
            method: "POST",
            body: JSON.stringify(model)
        });
        return response.data;
    };

    const update = async (id: number, model: ServiceDetailUpdate) => {
        const response = await apiFetch<ServiceDetailResponse>(`/ServiceDetail/${id}`, {
            method: "PATCH",
            body: JSON.stringify(model)
        });
        return response.data;
    };

    const deleteModel = async (id: number) => {
        const response = await apiFetch<ServiceDetailResponse>(`/ServiceDetail/${id}`, {
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
  
