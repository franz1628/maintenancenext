import { apiFetch } from "@/config/api";
import {  BrandCreate, BrandListResponse, BrandResponse, BrandUpdate } from "../types/brand.types";

export default function BrandApi() {
    const get = async () => {
        const response = await apiFetch<BrandListResponse>("/brand");
        return response.data;
    };

    const create = async (model: BrandCreate) => {
        const response = await apiFetch<BrandResponse>("/brand", {
            method: "POST",
            body: JSON.stringify(model)
        });
        return response.data;
    };

    const update = async (id: number, model: BrandUpdate) => {
        const response = await apiFetch<BrandResponse>(`/brand/${id}`, {
            method: "PATCH",
            body: JSON.stringify(model)
        });
        return response.data;
    };

    const deleteModel = async (id: number) => {
        const response = await apiFetch<BrandResponse>(`/brand/${id}`, {
            method: "DELETE"
        });

        return response.data;
    };

    const uploadLogo = async (formData: FormData, id: number) => {
        const response = await apiFetch<BrandResponse>(`/brand/${id}/uploadLogo`, {
            method: "POST",
            body: formData
        });

        return response.data;
    };

    return {
        get,
        create,
        update,
        deleteModel,
        uploadLogo
    };
}
  
