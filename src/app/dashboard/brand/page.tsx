'use client';
import Modal from "@/components/ui/Modal";
import BrandForm from "@/features/brand/components/BrandForm";
import BrandList from "@/features/brand/components/BrandList";
import BrandApi from "@/features/brand/services/brand.api";
import { Brand, BrandCreate, BrandInitial, BrandUpdate } from "@/features/brand/types/brand.types";
import { log } from "console";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";

export default  function BrandPage() {
    const [models, setModels] = useState<Brand[]>([]);
    const [id, setId] = useState<number>(0);
    const [showModal, setShowModal] = useState<boolean>(false);
    const [idDelete, setIdDelete] = useState<number>(0);

    useEffect( () => {
        load();
    }, []);

    const load = async () => {
        const data = await BrandApi().get();
        setModels(data);
    }

    const [model, setModel] = useState<BrandCreate | BrandUpdate>(BrandInitial);

    const onSubmit = async (modelPa: BrandCreate | BrandUpdate) => {
        if(id){
            const { created_at, updated_at, id, ...update } = modelPa as Brand;
            await BrandApi().update(id, update);
            Swal.fire({
                title: "Success",
                text: "Brand updated successfully",
                icon: "success",
            });
        } else {
            await BrandApi().create(modelPa as BrandCreate);
            Swal.fire({
                title: "Success",
                text: "Brand created successfully",
                icon: "success",
            });
        }

        setModel(BrandInitial);
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
            await BrandApi().deleteModel(id);
            Swal.fire({
                title: "Deleted!",
                text: "Your brand has been deleted.",
                icon: "success",
            });
            setIdDelete(0);
            setShowModal(false);
            load();
        }
    }

    const onEdit = (id:number, model: BrandUpdate) => {
        setId(id);
        setModel(model);
    }

    return (
        <div>
            <h1 className="text-2xl font-bold">Brand Page</h1>
            <hr  className="my-4" />
            <div className="grid grid-cols-4 md:grid-cols-4 gap-4 mb-4">
                <div>
                    <BrandForm model={model} onSubmit={onSubmit} />
                </div>
                <div className="col-span-3">
                    <BrandList models={models} onEdit={onEdit} onDelete={handleDelete} />
                </div>
            </div>

            {showModal && 
                <Modal onClose={() => setShowModal(false)} onConfirm={() => onDelete(idDelete)} text="Are you sure you want to delete this record?" />
            }
        </div>
    );
}