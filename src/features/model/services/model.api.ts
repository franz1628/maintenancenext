import { apiFetch } from "@/config/api";
import {  ModelCreate, ModelListResponse, ModelResponse, ModelUpdate } from "../types/model.types";

export default function ModelApi() {
    const get = async () => {
        const response = await apiFetch<ModelListResponse>("/model");
        return response.data;
    };

    const create = async (model: ModelCreate) => {
        const response = await apiFetch<ModelResponse>("/model", {
            method: "POST",
            body: JSON.stringify(model)
        });
        return response.data;
    };

    const update = async (id: number, model: ModelUpdate) => {
        const response = await apiFetch<ModelResponse>(`/model/${id}`, {
            method: "PATCH",
            body: JSON.stringify(model)
        });
        return response.data;
    };

    const deleteModel = async (id: number) => {
        const response = await apiFetch<ModelResponse>(`/model/${id}`, {
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
  
