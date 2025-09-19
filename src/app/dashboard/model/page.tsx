'use client';
import Modal from "@/components/ui/Modal";
import BrandApi from "@/features/brand/services/brand.api";
import { Brand } from "@/features/brand/types/brand.types";
import ModelForm from "@/features/model/components/form";
import ModelList from "@/features/model/components/list";
import ModelApi from "@/features/model/services/model.api";
import { Model, ModelCreate, ModelInitial, ModelUpdate } from "@/features/model/types/model.types";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";

export default  function ModelPage() {
    const [models, setModels] = useState<Model[]>([]);
    const [brands, setBrands] = useState<Brand[]>([]);
    const [id, setId] = useState<number>(0);
    const [showModal, setShowModal] = useState<boolean>(false);
    const [idDelete, setIdDelete] = useState<number>(0);

    useEffect( () => {
        load();
    }, []);

    const load = async () => {
        const data = await ModelApi().get();
        const brandData = await BrandApi().get();
        setBrands(brandData);
        setModels(data);
    }

    const [model, setModel] = useState<ModelCreate | ModelUpdate>(ModelInitial);

    const onSubmit = async (modelPa: ModelCreate | ModelUpdate) => {
        if(id){
            const { created_at, updated_at, id, brand, ...update } = modelPa as Model;
            await ModelApi().update(id, update);
            Swal.fire({
                title: "Success",
                text: "Model updated successfully",
                icon: "success",
            });
        } else {
            await ModelApi().create(modelPa as ModelCreate);
            Swal.fire({
                title: "Success",
                text: "Model created successfully",
                icon: "success",
            });
        }

        setModel(ModelInitial);
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
            await ModelApi().deleteModel(id);
            Swal.fire({
                title: "Deleted!",
                text: "Your Model has been deleted.",
                icon: "success",
            });
            setIdDelete(0);
            setShowModal(false);
            load();
        }
    }

    const onEdit = (id:number, model: ModelUpdate) => {
        setId(id);
        setModel(model);
    }

    return (
        <div>
            <h1 className="text-2xl font-bold">Model Page</h1>
            <hr  className="my-4" />
            <div className="grid grid-cols-4 md:grid-cols-4 gap-4 mb-4">
                <div>
                    <ModelForm model={model} onSubmit={onSubmit} brands={brands} />
                </div>
                <div className="col-span-3">
                    <ModelList models={models} onEdit={onEdit} onDelete={handleDelete} />
                </div>
            </div>

            {showModal && 
                <Modal onClose={() => setShowModal(false)} onConfirm={() => onDelete(idDelete)} text="Are you sure you want to delete this record?" />
            }
        </div>
    );
}