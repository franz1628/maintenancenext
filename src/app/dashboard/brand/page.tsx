'use client';
import Modal from "@/components/ui/Modal";
import BrandForm from "@/features/brand/components/form";

import BrandList from "@/features/brand/components/list";
import BrandApi from "@/features/brand/services/brand.api";
import { Brand, BrandCreate, BrandInitial, BrandUpdate } from "@/features/brand/types/brand.types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";

export default  function BrandPage() {
    const [id, setId] = useState<number>(0);
    const [showModal, setShowModal] = useState<boolean>(false);
    const [idDelete, setIdDelete] = useState<number>(0);
    const [model, setModel] = useState<BrandCreate | BrandUpdate>(BrandInitial);
    const queryClient = useQueryClient();

    const { data, isLoading, error } = useQuery({
        queryKey: ['brands'],
        queryFn: BrandApi().get
    })

    const saveMutation = useMutation({
        mutationFn: (newBrand: BrandCreate | BrandUpdate) => {
            if(id){
                const { created_at, updated_at, id, ...update } = newBrand as Brand;
                return BrandApi().update(id, update);
            } else {
                return BrandApi().create(newBrand as BrandCreate);
            }       
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['brands'] });    
        }
    });

    const deleteMutation = useMutation({
        mutationFn: (id: number) => BrandApi().deleteModel(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['brands'] });    
        }
    });

    const uploadMutation = useMutation({
        mutationFn: ({formData, id}: {formData: FormData, id:number}) => BrandApi().uploadLogo(formData, id)
    });

    const onSubmit = async (modelPa: BrandCreate | BrandUpdate, image: File | null) => {
        setModel(modelPa);
        const newModel = await saveMutation.mutateAsync(modelPa);

        if (image && newModel.id) {
            const formData = new FormData();
            formData.append("file", image);
            await uploadMutation.mutateAsync({  formData, id: newModel.id });
        }

        Swal.fire({
            title: "Success",
            text: id ? "Brand updated successfully" : "Brand created successfully",
            icon: "success",
        });
        setId(0);
        setModel(BrandInitial);
 
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
                text: "Your brand has been deleted.",
                icon: "success",
            });
            setIdDelete(0);
            setShowModal(false);
           
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
            <div className="grid grid-cols-12 md:grid-cols-12 gap-2 mb-4">
                <div className="col-span-4">
                    <BrandForm model={model} onSubmit={onSubmit} isLoading={saveMutation.isPending}/>
                </div>
                <div className="col-span-8">
                    <BrandList models={data || []} onEdit={onEdit} onDelete={handleDelete} isLoading={isLoading} />
                </div>
            </div>

            {showModal && 
                <Modal onClose={() => setShowModal(false)} onConfirm={() => onDelete(idDelete)} text="Are you sure you want to delete this record?" />
            }
        </div>
    );
}