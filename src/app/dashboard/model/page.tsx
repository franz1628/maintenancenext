'use client';
import Modal from "@/components/ui/Modal";
import BrandApi from "@/features/brand/services/brand.api";
import { Brand } from "@/features/brand/types/brand.types";
import ModelForm from "@/features/model/components/form";
import ModelList from "@/features/model/components/list";
import ModelApi from "@/features/model/services/model.api";
import { Model, ModelCreate, ModelInitial, ModelUpdate } from "@/features/model/types/model.types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";

export default  function ModelPage() {
    const [id, setId] = useState<number>(0);
    const [showModal, setShowModal] = useState<boolean>(false);
    const [idDelete, setIdDelete] = useState<number>(0);
    const queryClient = useQueryClient();

    const {data:models, isLoading, error} = useQuery({
        queryKey: ['models'],
        queryFn: ModelApi().get
    });

    const brands = useQuery({
        queryKey: ['brands'],
        queryFn: BrandApi().get
    });

    const saveMutation = useMutation({
        mutationFn: (model: ModelCreate | ModelUpdate) => {
            if(id === 0) {
                return ModelApi().create(model as ModelCreate);
            } else {
                const { created_at, updated_at, id, brand, ...update } = model as Model;
                return ModelApi().update(id, update);
            }
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['models'] });
        }
    });

    const deleteMutation = useMutation({
        mutationFn: (id: number) => ModelApi().deleteModel(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['models'] });
        }
    });

    const [model, setModel] = useState<ModelCreate | ModelUpdate>(ModelInitial);

    const onSubmit = async (modelPa: ModelCreate | ModelUpdate) => {
        await saveMutation.mutateAsync(modelPa);
        setModel(ModelInitial);
        setId(0);
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
            await deleteMutation.mutateAsync(id);
            Swal.fire({
                title: "Deleted!",
                text: "Your Model has been deleted.",
                icon: "success",
            });
            setIdDelete(0);
            setShowModal(false);
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
                    <ModelForm model={model} onSubmit={onSubmit} brands={brands.data || []} isLoading={saveMutation.isPending} />
                </div>
                <div className="col-span-3">
                    <ModelList models={models || []} onEdit={onEdit} onDelete={handleDelete} isLoading={isLoading} />
                </div>
            </div>

            {showModal && 
                <Modal onClose={() => setShowModal(false)} onConfirm={() => onDelete(idDelete)} text="Are you sure you want to delete this record?" />
            }
        </div>
    );
}