import { apiFetch } from "@/config/api";
import {  SellerCreate, SellerListResponse, SellerResponse, SellerUpdate } from "../types/seller.types";

export default function SellerApi() {
    const get = async () => {
        const response = await apiFetch<SellerListResponse>("/seller");
        return response.data;
    };

    const create = async (model: SellerCreate) => {
        const response = await apiFetch<SellerResponse>("/seller", {
            method: "POST",
            body: JSON.stringify(model)
        });
        return response.data;
    };

    const update = async (id: number, model: SellerUpdate) => {
        const response = await apiFetch<SellerResponse>(`/seller/${id}`, {
            method: "PATCH",
            body: JSON.stringify(model)
        });
        return response.data;
    };

    const deleteModel = async (id: number) => {
        const response = await apiFetch<SellerResponse>(`/seller/${id}`, {
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
  
