import { apiFetch } from "@/config/api";
import {  UserCreate, UserListResponse, UserResponse, UserUpdate } from "../types/user.types";

export default function UserApi() {
    const get = async () => {
        const response = await apiFetch<UserListResponse>("/user");
        return response.data;
    };

    const create = async (model: UserCreate) => {
        const response = await apiFetch<UserResponse>("/user", {
            method: "POST",
            body: JSON.stringify(model)
        });
        return response.data;
    };

    const update = async (id: number, model: UserUpdate) => {
        const response = await apiFetch<UserResponse>(`/user/${id}`, {
            method: "PATCH",
            body: JSON.stringify(model)
        });
        return response.data;
    };

    const deleteModel = async (id: number) => {
        const response = await apiFetch<UserResponse>(`/user/${id}`, {
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
  
