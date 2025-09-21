'use client';
import Modal from "@/components/ui/Modal";
import PieceCatalogApi from "@/features/piece-catalog/services/piece-catalog.api";
import { PieceCatalog } from "@/features/piece-catalog/types/piece-catalog.types";
import ServiceCatalogApi from "@/features/service-catalog/services/service-catalog.api";
import { ServiceCatalog } from "@/features/service-catalog/types/service-catalog.types";
import ServiceDetailCatalogForm from "@/features/service-detail-catalog/components/form";

import ServiceDetailCatalogList from "@/features/service-detail-catalog/components/list";
import ServiceDetailCatalogApi from "@/features/service-detail-catalog/services/service-detail-catalog.api";
import { ServiceDetailCatalog, ServiceDetailCatalogCreate, ServiceDetailCatalogInitial, ServiceDetailCatalogUpdate } from "@/features/service-detail-catalog/types/service-detail-catalog.types";
import ToolCatalogApi from "@/features/tool-catalog/services/tool-catalog.api";
import { ToolCatalog } from "@/features/tool-catalog/types/tool-catalog.types";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";

export default  function ServiceDetailCatalogPage() {
    const [models, setModels] = useState<ServiceDetailCatalog[]>([]);
    const [serviceCatalogs, setServiceCatalogs] = useState<ServiceCatalog[]>([]);
    const [pieceCatalogs, setPieceCatalogs] = useState<PieceCatalog[]>([]);
    const [toolCatalogs, setToolCatalogs] = useState<ToolCatalog[]>([]);
    const [id, setId] = useState<number>(0);
    const [showModal, setShowModal] = useState<boolean>(false);
    const [idDelete, setIdDelete] = useState<number>(0);

    useEffect( () => {
        load();
    }, []);

    const load = async () => {
        const data = await ServiceDetailCatalogApi().get();
        const dataServiceCatalog = await ServiceCatalogApi().get();
        const dataPieceCatalog = await PieceCatalogApi().get();
        const dataToolCatalog = await ToolCatalogApi().get();

        setServiceCatalogs(dataServiceCatalog);
        setPieceCatalogs(dataPieceCatalog);
        setToolCatalogs(dataToolCatalog);
        setModels(data);
    }

    const [model, setModel] = useState<ServiceDetailCatalogCreate | ServiceDetailCatalogUpdate>(ServiceDetailCatalogInitial);

    const onSubmit = async (modelPa: ServiceDetailCatalogCreate | ServiceDetailCatalogUpdate) => {
        if(id){
            const { created_at, updated_at, id, service_catalog, piece_catalog, tool_catalog, ...update } = modelPa as ServiceDetailCatalog;
            await ServiceDetailCatalogApi().update(id, update);
            Swal.fire({
                title: "Success",
                text: "ServiceDetailCatalog updated successfully",
                icon: "success",
            });
        } else {
            await ServiceDetailCatalogApi().create(modelPa as ServiceDetailCatalogCreate);
            Swal.fire({
                title: "Success",
                text: "ServiceDetailCatalog created successfully",
                icon: "success",
            });
        }

        setModel(ServiceDetailCatalogInitial);
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
            await ServiceDetailCatalogApi().deleteModel(id);
            Swal.fire({
                title: "Deleted!",
                text: "Your ServiceDetailCatalog has been deleted.",
                icon: "success",
            });
            setIdDelete(0);
            setShowModal(false);
            load();
        }
    }

    const onEdit = (id:number, model: ServiceDetailCatalogUpdate) => {
        setId(id);
        setModel(model);

    }

    return (
        <div>
            <h1 className="text-2xl font-bold">ServiceDetailCatalog Page</h1>
            <hr  className="my-4" />
            <div className="grid grid-cols-4 md:grid-cols-4 gap-4 mb-4">
                <div>
                    <ServiceDetailCatalogForm model={model} onSubmit={onSubmit} serviceCatalogs={serviceCatalogs} pieceCatalogs={pieceCatalogs} toolCatalogs={toolCatalogs} />
                </div>
                <div className="col-span-3">
                    <ServiceDetailCatalogList models={models} onEdit={onEdit} onDelete={handleDelete} />
                </div>
            </div>

            {showModal &&  
                <Modal onClose={() => setShowModal(false)} onConfirm={() => onDelete(idDelete)} text="Are you sure you want to delete this record?" />
            }
        </div>
    );
}