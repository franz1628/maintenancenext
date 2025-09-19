'use client';
import Modal from "@/components/ui/Modal";
import DocumentTypeForm from "@/features/document-type/components/form";
import DocumentTypeList from "@/features/document-type/components/list";
import DocumentTypeApi from "@/features/document-type/services/document-type.api";
import { DocumentType, DocumentTypeCreate, DocumentTypeInitial, DocumentTypeUpdate } from "@/features/document-type/types/document-type.types";

import { useEffect, useState } from "react";
import Swal from "sweetalert2";

export default  function DocumentTypePage() {
    const [models, setModels] = useState<DocumentType[]>([]);
    const [id, setId] = useState<number>(0);
    const [showModal, setShowModal] = useState<boolean>(false);
    const [idDelete, setIdDelete] = useState<number>(0);

    useEffect( () => {
        load();
    }, []);

    const load = async () => {
        const data = await DocumentTypeApi().get();
        setModels(data);
    }

    const [model, setModel] = useState<DocumentTypeCreate | DocumentTypeUpdate>(DocumentTypeInitial);

    const onSubmit = async (modelPa: DocumentTypeCreate | DocumentTypeUpdate) => {
        if(id){
            const { created_at, updated_at, id, ...update } = modelPa as DocumentType;
            await DocumentTypeApi().update(id, update);
            Swal.fire({
                title: "Success",
                text: "DocumentType updated successfully",
                icon: "success",
            });
        } else {
            await DocumentTypeApi().create(modelPa as DocumentTypeCreate);
            Swal.fire({
                title: "Success",
                text: "DocumentType created successfully",
                icon: "success",
            });
        }

        setModel(DocumentTypeInitial);
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
            await DocumentTypeApi().deleteModel(id);
            Swal.fire({
                title: "Deleted!",
                text: "Your DocumentType has been deleted.",
                icon: "success",
            });
            setIdDelete(0);
            setShowModal(false);
            load();
        }
    }

    const onEdit = (id:number, model: DocumentTypeUpdate) => {
        setId(id);
        setModel(model);
    }

    return (
        <div>
            <h1 className="text-2xl font-bold">DocumentType Page</h1>
            <hr  className="my-4" />
            <div className="grid grid-cols-4 md:grid-cols-4 gap-4 mb-4">
                <div>
                    <DocumentTypeForm model={model} onSubmit={onSubmit} />
                </div>
                <div className="col-span-3">
                    <DocumentTypeList models={models} onEdit={onEdit} onDelete={handleDelete} />
                </div>
            </div>

            {showModal && 
                <Modal onClose={() => setShowModal(false)} onConfirm={() => onDelete(idDelete)} text="Are you sure you want to delete this record?" />
            }
        </div>
    );
}