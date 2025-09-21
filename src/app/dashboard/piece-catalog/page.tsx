'use client';
import Modal from "@/components/ui/Modal";
import PieceCatalogForm from "@/features/piece-catalog/components/form";

import PieceCatalogList from "@/features/piece-catalog/components/list";
import PieceCatalogApi from "@/features/piece-catalog/services/piece-catalog.api";
import { PieceCatalog, PieceCatalogCreate, PieceCatalogInitial, PieceCatalogUpdate } from "@/features/piece-catalog/types/piece-catalog.types";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";

export default  function PieceCatalogPage() {
    const [models, setModels] = useState<PieceCatalog[]>([]);
    const [id, setId] = useState<number>(0);
    const [showModal, setShowModal] = useState<boolean>(false);
    const [idDelete, setIdDelete] = useState<number>(0);

    useEffect( () => {
        load();
    }, []);

    const load = async () => {
        const data = await PieceCatalogApi().get();
        setModels(data);
    }

    const [model, setModel] = useState<PieceCatalogCreate | PieceCatalogUpdate>(PieceCatalogInitial);

    const onSubmit = async (modelPa: PieceCatalogCreate | PieceCatalogUpdate) => {
        if (id) {
            await PieceCatalogApi().update(id, modelPa);
        } else {
            await PieceCatalogApi().create(modelPa as PieceCatalogCreate);
        }

    Swal.fire({
        title: "Success",
        text: "PieceCatalog saved successfully",
        icon: "success",
    });

        setModel(PieceCatalogInitial);
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
            await PieceCatalogApi().deleteModel(id);
            Swal.fire({
                title: "Deleted!",
                text: "Your PieceCatalog has been deleted.",
                icon: "success",
            });
            setIdDelete(0);
            setShowModal(false);
            load();
        }
    }

    const onEdit = (id:number, model: PieceCatalogUpdate) => {
        console.log(model);
        
        setId(id);
        setModel(model);
    }

    return (
        <div>
            <h1 className="text-2xl font-bold">PieceCatalog Page</h1>
            <hr  className="my-4" />
            <div className="grid grid-cols-4 md:grid-cols-4 gap-4 mb-4">
                <div>
                    <PieceCatalogForm model={model} onSubmit={onSubmit} />
                </div>
                <div className="col-span-3">
                    <PieceCatalogList models={models} onEdit={onEdit} onDelete={handleDelete} />
                </div>
            </div>

            {showModal && 
                <Modal onClose={() => setShowModal(false)} onConfirm={() => onDelete(idDelete)} text="Are you sure you want to delete this record?" />
            }
        </div>
    );
}