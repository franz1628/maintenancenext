import { apiFetch } from "@/config/api";
import {  VehicleCreate, VehicleListResponse, VehicleResponse, VehicleUpdate } from "../types/vehicle.types";

export default function VehicleApi() {
    const get = async () => {
        const response = await apiFetch<VehicleListResponse>("/vehicle");
        return response.data;
    };

    const create = async (model: VehicleCreate) => {
        const response = await apiFetch<VehicleResponse>("/vehicle", {
            method: "POST",
            body: JSON.stringify(model)
        });
        return response.data;
    };

    const update = async (id: number, model: VehicleUpdate) => {
        const response = await apiFetch<VehicleResponse>(`/vehicle/${id}`, {
            method: "PATCH",
            body: JSON.stringify(model)
        });
        return response.data;
    };

    const deleteModel = async (id: number) => {
        const response = await apiFetch<VehicleResponse>(`/vehicle/${id}`, {
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
  
