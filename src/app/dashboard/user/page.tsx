'use client';
import Modal from "@/components/ui/Modal";
import DocumentTypeApi from "@/features/document-type/services/document-type.api";
import UserForm from "@/features/user/components/form";
import UserList from "@/features/user/components/list";
import UserApi from "@/features/user/services/user.api";
import { User, UserCreate, UserInitial, UserUpdate } from "@/features/user/types/user.types";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";

export default  function UserPage() {
    const [models, setModels] = useState<User[]>([]);
    const [id, setId] = useState<number>(0);
    const [showModal, setShowModal] = useState<boolean>(false);
    const [idDelete, setIdDelete] = useState<number>(0);
    const [documentTypes, setDocumentTypes] = useState<any[]>([]);

    useEffect( () => {
        load();
    }, []);

    const load = async () => {
        const data = await UserApi().get();
        const documentTypeData = await DocumentTypeApi().get();
        
        setDocumentTypes(documentTypeData);
        setModels(data);
    }

    const [model, setModel] = useState<UserCreate | UserUpdate>(UserInitial);

    const onSubmit = async (modelPa: UserCreate | UserUpdate) => {
        if(id){
            const { created_at, updated_at, id, document_type, ...update } = modelPa as User;
            await UserApi().update(id, update);
            Swal.fire({
                title: "Success",
                text: "User updated successfully",
                icon: "success",
            });
        } else {
            await UserApi().create(modelPa as UserCreate);
            Swal.fire({
                title: "Success",
                text: "User created successfully",
                icon: "success",
            });
        }

        setModel(UserInitial);
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
            await UserApi().deleteModel(id);
            Swal.fire({
                title: "Deleted!",
                text: "Your User has been deleted.",
                icon: "success",
            });
            setIdDelete(0);
            setShowModal(false);
            load();
        }
    }

    const onEdit = (id:number, model: UserUpdate) => {
        setId(id);
        setModel(model);
    }

    return (
        <div>
            <h1 className="text-2xl font-bold">User Page</h1>
            <hr  className="my-4" />
            <div className="grid grid-cols-4 md:grid-cols-4 gap-4 mb-4">
                <div>
                    <UserForm model={model} onSubmit={onSubmit} documentTypes={documentTypes} />
                </div>
                <div className="col-span-3">
                    <UserList models={models} onEdit={onEdit} onDelete={handleDelete} />
                </div>
            </div>

            {showModal && 
                <Modal onClose={() => setShowModal(false)} onConfirm={() => onDelete(idDelete)} text="Are you sure you want to delete this record?" />
            }
        </div>
    );
}