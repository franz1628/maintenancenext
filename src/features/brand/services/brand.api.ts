import { apiFetch } from "@/config/api";
import {  BrandCreate, BrandListResponse, BrandResponse, BrandUpdate } from "../types/brand.types";



export default function BrandApi() {
    const get = async () => {
        const response = await apiFetch<BrandListResponse>("/brand");
        return response.data;
    };

    const create = async (brand: BrandCreate) => {
        const response = await apiFetch<BrandResponse>("/brand", {
            method: "POST",
            body: JSON.stringify(brand)
        });
        return response.data;
    };

    const update = async (id: number, brand: BrandUpdate) => {
        const response = await apiFetch<BrandResponse>(`/brand/${id}`, {
            method: "PATCH",
            body: JSON.stringify(brand)
        });
        return response.data;
    };

    const deleteModel = async (id: number) => {
        const response = await apiFetch<BrandResponse>(`/brand/${id}`, {
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
  
