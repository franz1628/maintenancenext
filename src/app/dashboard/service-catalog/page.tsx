'use client';
import Modal from "@/components/ui/Modal";
import ServiceCatalogForm from "@/features/service-catalog/components/form";

import ServiceCatalogList from "@/features/service-catalog/components/list";
import ServiceCatalogApi from "@/features/service-catalog/services/service-catalog.api";
import { ServiceCatalog, ServiceCatalogCreate, ServiceCatalogInitial, ServiceCatalogUpdate } from "@/features/service-catalog/types/service-catalog.types";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";

export default  function ServiceCatalogPage() {
    const [models, setModels] = useState<ServiceCatalog[]>([]);
    const [id, setId] = useState<number>(0);
    const [showModal, setShowModal] = useState<boolean>(false);
    const [idDelete, setIdDelete] = useState<number>(0);

    useEffect( () => {
        load();
    }, []);

    const load = async () => {
        const data = await ServiceCatalogApi().get();
        setModels(data);
    }

    const [model, setModel] = useState<ServiceCatalogCreate | ServiceCatalogUpdate>(ServiceCatalogInitial);

    const onSubmit = async (modelPa: ServiceCatalogCreate | ServiceCatalogUpdate) => {
        if(id){
            await ServiceCatalogApi().update(id, modelPa);
            Swal.fire({
                title: "Success",
                text: "ServiceCatalog updated successfully",
                icon: "success",
            });
        } else {
            await ServiceCatalogApi().create(modelPa as ServiceCatalogCreate);
            Swal.fire({
                title: "Success",
                text: "ServiceCatalog created successfully",
                icon: "success",
            });
        }

        setModel(ServiceCatalogInitial);
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
            await ServiceCatalogApi().deleteModel(id);
            Swal.fire({
                title: "Deleted!",
                text: "Your ServiceCatalog has been deleted.",
                icon: "success",
            });
            setIdDelete(0);
            setShowModal(false);
            load();
        }
    }

    const onEdit = (id:number, model: ServiceCatalogUpdate) => {
        setId(id);
        setModel(model);
    }

    return (
        <div>
            <h1 className="text-2xl font-bold">ServiceCatalog Page</h1>
            <hr  className="my-4" />
            <div className="grid grid-cols-4 md:grid-cols-4 gap-4 mb-4">
                <div>
                    <ServiceCatalogForm model={model} onSubmit={onSubmit} />
                </div>
                <div className="col-span-3">
                    <ServiceCatalogList models={models} onEdit={onEdit} onDelete={handleDelete} />
                </div>
            </div>

            {showModal && 
                <Modal onClose={() => setShowModal(false)} onConfirm={() => onDelete(idDelete)} text="Are you sure you want to delete this record?" />
            }
        </div>
    );
}