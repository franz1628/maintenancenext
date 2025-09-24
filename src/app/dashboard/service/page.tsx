'use client';
import Modal from "@/components/ui/Modal";
import SellerApi from "@/features/seller/services/seller.api";
import { Seller } from "@/features/seller/types/seller.types";
import ServiceCatalogApi from "@/features/service-catalog/services/service-catalog.api";
import { ServiceCatalog } from "@/features/service-catalog/types/service-catalog.types";
import ServiceForm from "@/features/service/components/form";

import ServiceList from "@/features/service/components/list";
import ServiceApi from "@/features/service/services/service.api";
import { Service, ServiceCreate, ServiceInitial, ServiceUpdate } from "@/features/service/types/service.types";
import UserApi from "@/features/user/services/user.api";
import { User } from "@/features/user/types/user.types";
import VehicleApi from "@/features/vehicle/services/vehicle.api";
import { Vehicle } from "@/features/vehicle/types/vehicle.types";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";

export default  function ServicePage() {
    const [models, setModels] = useState<Service[]>([]);
    const [vehicles, setVehicles] = useState<Vehicle[]>([]);
    const [users, setUsers] = useState<User[]>([]);
    const [serviceCatalogs, setServiceCatalogs] = useState<ServiceCatalog[]>([]);
    const [sellers, setSellers] = useState<Seller[]>([]);
    const [id, setId] = useState<number>(0);
    const [showModal, setShowModal] = useState<boolean>(false);
    const [idDelete, setIdDelete] = useState<number>(0);

    useEffect( () => {
        load();
    }, []);

    const load = async () => {
        const data = await ServiceApi().get();
        const dataVehicles = await VehicleApi().get();
        const dataUsers = await UserApi().get();
        const dataServiceCatalogs = await ServiceCatalogApi().get();
        const dataSellers = await SellerApi().get();

        setVehicles(dataVehicles);
        setUsers(dataUsers);
        setServiceCatalogs(dataServiceCatalogs);
        setSellers(dataSellers);
        setModels(data);
    }

    const [model, setModel] = useState<ServiceCreate | ServiceUpdate>(ServiceInitial);

    const onSubmit = async (modelPa: ServiceCreate | ServiceUpdate) => {
        if(id){
            await ServiceApi().update(id, modelPa as ServiceUpdate);
            Swal.fire({
                title: "Success",
                text: "Service updated successfully",
                icon: "success",
            });
        } else {
            await ServiceApi().create(modelPa as ServiceCreate);
            Swal.fire({
                title: "Success",
                text: "Service created successfully",
                icon: "success",
            });
        }

        setModel(ServiceInitial);
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
            await ServiceApi().deleteModel(id);
            Swal.fire({
                title: "Deleted!",
                text: "Your Service has been deleted.",
                icon: "success",
            });
            setIdDelete(0);
            setShowModal(false);
            load();
        }
    }

    const onEdit = (id:number, model: ServiceUpdate) => {
        setId(id);
        setModel(model);
    }

    return (
        <div>
            <h1 className="text-2xl font-bold">Service Page</h1>
            <hr  className="my-4" />
            <div className="grid grid-cols-4 md:grid-cols-4 gap-4 mb-4">
                <div>
                    <ServiceForm model={model} onSubmit={onSubmit} vehicles={vehicles} users={users} serviceCatalogs={serviceCatalogs} sellers={sellers} />
                </div>
                <div className="col-span-3">
                    <ServiceList models={models} onEdit={onEdit} onDelete={handleDelete} />
                </div>
            </div>

            {showModal && 
                <Modal onClose={() => setShowModal(false)} onConfirm={() => onDelete(idDelete)} text="Are you sure you want to delete this record?" />
            }
        </div>
    );
}