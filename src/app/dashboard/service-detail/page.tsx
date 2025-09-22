'use client';
import Modal from "@/components/ui/Modal";
import MecanicApi from "@/features/mecanic/services/mecanic.api";
import { Mecanic } from "@/features/mecanic/types/mecanic.types";
import ServiceDetailCatalogApi from "@/features/service-detail-catalog/services/service-detail-catalog.api";
import { ServiceDetailCatalog } from "@/features/service-detail-catalog/types/service-detail-catalog.types";
import ServiceDetailForm from "@/features/service-detail/components/form";

import ServiceDetailList from "@/features/service-detail/components/list";
import ServiceDetailApi from "@/features/service-detail/services/service-detail.api";
import { ServiceDetail, ServiceDetailCreate, ServiceDetailInitial, ServiceDetailUpdate } from "@/features/service-detail/types/service-detail.types";
import ServiceApi from "@/features/service/services/service.api";
import { Service } from "@/features/service/types/service.types";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";

export default  function ServiceDetailPage() {
    const [models, setModels] = useState<ServiceDetail[]>([]);
    const [services, setServices] = useState<Service[]>([]);
    const [serviceDetailCatalogs, setServiceDetailCatalogs] = useState<ServiceDetailCatalog[]>([]);
    const [mecanicans, setMecanicans] = useState<Mecanic[]>([]);
    const [id, setId] = useState<number>(0);
    const [showModal, setShowModal] = useState<boolean>(false);
    const [idDelete, setIdDelete] = useState<number>(0);

    useEffect( () => {
        load();
    }, []);

    const load = async () => {
        const data = await ServiceDetailApi().get();
        const dataServices = await ServiceApi().get();
        const dataServiceDetailCatalogs = await ServiceDetailCatalogApi().get();
        const dataMecanicans = await MecanicApi().get();
        
        setServices(dataServices);
        setServiceDetailCatalogs(dataServiceDetailCatalogs);
        setMecanicans(dataMecanicans);

        setModels(data);
    }

    const [model, setModel] = useState<ServiceDetailCreate | ServiceDetailUpdate>(ServiceDetailInitial);

    const onSubmit = async (modelPa: ServiceDetailCreate | ServiceDetailUpdate) => {
        if(id){
            const { created_at, updated_at, id, ...update } = modelPa as ServiceDetail;
            await ServiceDetailApi().update(id, update);
            Swal.fire({
                title: "Success",
                text: "ServiceDetail updated successfully",
                icon: "success",
            });
        } else {
            await ServiceDetailApi().create(modelPa as ServiceDetailCreate);
            Swal.fire({
                title: "Success",
                text: "ServiceDetail created successfully",
                icon: "success",
            });
        }

        setModel(ServiceDetailInitial);
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
            await ServiceDetailApi().deleteModel(id);
            Swal.fire({
                title: "Deleted!",
                text: "Your ServiceDetail has been deleted.",
                icon: "success",
            });
            setIdDelete(0);
            setShowModal(false);
            load();
        }
    }

    const onEdit = (id:number, model: ServiceDetailUpdate) => {
        setId(id);
        setModel(model);
    }

    return (
        <div>
            <h1 className="text-2xl font-bold">ServiceDetail Page</h1>
            <hr  className="my-4" />
            <div className="grid grid-cols-4 md:grid-cols-4 gap-4 mb-4">
                <div>
                    <ServiceDetailForm model={model} onSubmit={onSubmit} services={services} serviceDetailCatalogs={serviceDetailCatalogs} mecanicans={mecanicans} />
                </div>
                <div className="col-span-3">
                    <ServiceDetailList models={models} onEdit={onEdit} onDelete={handleDelete} />
                </div>
            </div>

            {showModal && 
                <Modal onClose={() => setShowModal(false)} onConfirm={() => onDelete(idDelete)} text="Are you sure you want to delete this record?" />
            }
        </div>
    );
}