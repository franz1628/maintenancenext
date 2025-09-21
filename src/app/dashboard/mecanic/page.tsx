'use client';
import Modal from "@/components/ui/Modal";
import DocumentTypeApi from "@/features/document-type/services/document-type.api";
import MecanicForm from "@/features/mecanic/components/form";
import MecanicList from "@/features/mecanic/components/list";
import MecanicApi from "@/features/mecanic/services/mecanic.api";
import { Mecanic, MecanicCreate, MecanicInitial, MecanicUpdate } from "@/features/mecanic/types/mecanic.types";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";

export default  function MecanicPage() {
    const [models, setModels] = useState<Mecanic[]>([]);
    const [id, setId] = useState<number>(0);
    const [showModal, setShowModal] = useState<boolean>(false);
    const [idDelete, setIdDelete] = useState<number>(0);
    const [documentTypes, setDocumentTypes] = useState<any[]>([]);

    useEffect( () => {
        load();
    }, []);

    const load = async () => {
        const data = await MecanicApi().get();
        const documentTypeData = await DocumentTypeApi().get();
        
        setDocumentTypes(documentTypeData);
        setModels(data);
    }

    const [model, setModel] = useState<MecanicCreate | MecanicUpdate>(MecanicInitial);

    const onSubmit = async (modelPa: MecanicCreate | MecanicUpdate) => {
        if(id){
            const { created_at, updated_at, id, document_type, ...update } = modelPa as Mecanic;
            await MecanicApi().update(id, update);
            Swal.fire({
                title: "Success",
                text: "Mecanic updated successfully",
                icon: "success",
            });
        } else {
            await MecanicApi().create(modelPa as MecanicCreate);
            Swal.fire({
                title: "Success",
                text: "Mecanic created successfully",
                icon: "success",
            });
        }

        setModel(MecanicInitial);
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
            await MecanicApi().deleteModel(id);
            Swal.fire({
                title: "Deleted!",
                text: "Your Mecanic has been deleted.",
                icon: "success",
            });
            setIdDelete(0);
            setShowModal(false);
            load();
        }
    }

    const onEdit = (id:number, model: MecanicUpdate) => {
        setId(id);
        setModel(model);
    }

    return (
        <div>
            <h1 className="text-2xl font-bold">Mecanic Page</h1>
            <hr  className="my-4" />
            <div className="grid grid-cols-4 md:grid-cols-4 gap-4 mb-4">
                <div>
                    <MecanicForm model={model} onSubmit={onSubmit} documentTypes={documentTypes} />
                </div>
                <div className="col-span-3">
                    <MecanicList models={models} onEdit={onEdit} onDelete={handleDelete} />
                </div>
            </div>

            {showModal && 
                <Modal onClose={() => setShowModal(false)} onConfirm={() => onDelete(idDelete)} text="Are you sure you want to delete this record?" />
            }
        </div>
    );
}