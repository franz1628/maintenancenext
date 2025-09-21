import { apiFetch } from "@/config/api";
import {  MecanicCreate, MecanicListResponse, MecanicResponse, MecanicUpdate } from "../types/mecanic.types";

export default function MecanicApi() {
    const get = async () => {
        const response = await apiFetch<MecanicListResponse>("/mecanic");
        return response.data;
    };

    const create = async (model: MecanicCreate) => {
        const response = await apiFetch<MecanicResponse>("/mecanic", {
            method: "POST",
            body: JSON.stringify(model)
        });
        return response.data;
    };

    const update = async (id: number, model: MecanicUpdate) => {
        const response = await apiFetch<MecanicResponse>(`/mecanic/${id}`, {
            method: "PATCH",
            body: JSON.stringify(model)
        });
        return response.data;
    };

    const deleteModel = async (id: number) => {
        const response = await apiFetch<MecanicResponse>(`/mecanic/${id}`, {
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
  
