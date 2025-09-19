import { apiFetch } from "@/config/api";
import {  DocumentTypeCreate, DocumentTypeListResponse, DocumentTypeResponse, DocumentTypeUpdate } from "../types/document-type.types";

export default function DocumentTypeApi() {
    const get = async () => {
        const response = await apiFetch<DocumentTypeListResponse>("/document-type");
        return response.data;
    };

    const create = async (model: DocumentTypeCreate) => {
        const response = await apiFetch<DocumentTypeResponse>("/document-type", {
            method: "POST",
            body: JSON.stringify(model)
        });
        return response.data;
    };

    const update = async (id: number, model: DocumentTypeUpdate) => {
        const response = await apiFetch<DocumentTypeResponse>(`/document-type/${id}`, {
            method: "PATCH",
            body: JSON.stringify(model)
        });
        return response.data;
    };

    const deleteModel = async (id: number) => {
        const response = await apiFetch<DocumentTypeResponse>(`/document-type/${id}`, {
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
  
