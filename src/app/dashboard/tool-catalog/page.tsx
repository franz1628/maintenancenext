'use client';
import Modal from "@/components/ui/Modal";
import ToolCatalogForm from "@/features/tool-catalog/components/form";

import ToolCatalogList from "@/features/tool-catalog/components/list";
import ToolCatalogApi from "@/features/tool-catalog/services/tool-catalog.api";
import { ToolCatalog, ToolCatalogCreate, ToolCatalogInitial, ToolCatalogUpdate } from "@/features/tool-catalog/types/tool-catalog.types";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";

export default  function ToolCatalogPage() {
    const [models, setModels] = useState<ToolCatalog[]>([]);
    const [id, setId] = useState<number>(0);
    const [showModal, setShowModal] = useState<boolean>(false);
    const [idDelete, setIdDelete] = useState<number>(0);

    useEffect( () => {
        load();
    }, []);

    const load = async () => {
        const data = await ToolCatalogApi().get();
        setModels(data);
    }

    const [model, setModel] = useState<ToolCatalogCreate | ToolCatalogUpdate>(ToolCatalogInitial);

    const onSubmit = async (modelPa: ToolCatalogCreate | ToolCatalogUpdate) => {
        if(id){
            const { created_at, updated_at, id, ...update } = modelPa as ToolCatalog;
            await ToolCatalogApi().update(id, update);
            Swal.fire({
                title: "Success",
                text: "ToolCatalog updated successfully",
                icon: "success",
            });
        } else {
            await ToolCatalogApi().create(modelPa as ToolCatalogCreate);
            Swal.fire({
                title: "Success",
                text: "ToolCatalog created successfully",
                icon: "success",
            });
        }

        setModel(ToolCatalogInitial);
        setId(0);
        load();
    }

    const handleDelete = async (id: number) => {
        setShowModal(true);
        setIdDelete(id);
    }

    const onDelete = async (id: number) => {
        const result = await Swal.fire({
            title: "Are you sure?",
            text: "This action cannot be undone.",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Yes, delete it!",
            cancelButtonText: "No, cancel!",
        });

        if (result.isConfirmed) {
            await ToolCatalogApi().deleteModel(id);
            Swal.fire({
                title: "Deleted!",
                text: "Your ToolCatalog has been deleted.",
                icon: "success",
            });
            setIdDelete(0);
            setShowModal(false);
            load();
        }
    }

    const onEdit = (id:number, model: ToolCatalogUpdate) => {
        setId(id);
        setModel(model);
    }

    return (
        <div>
            <h1 className="text-2xl font-bold">ToolCatalog Page</h1>
            <hr  className="my-4" />
            <div className="grid grid-cols-4 md:grid-cols-4 gap-4 mb-4">
                <div>
                    <ToolCatalogForm model={model} onSubmit={onSubmit} />
                </div>
                <div className="col-span-3">
                    <ToolCatalogList models={models} onEdit={onEdit} onDelete={handleDelete} />
                </div>
            </div>

            {showModal && 
                <Modal onClose={() => setShowModal(false)} onConfirm={() => onDelete(idDelete)} text="Are you sure you want to delete this record?" />
            }
        </div>
    );
}