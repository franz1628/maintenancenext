'use client';
import Modal from "@/components/ui/Modal";
import ModelApi from "@/features/model/services/model.api";
import { Model } from "@/features/model/types/model.types";
import UserApi from "@/features/user/services/user.api";
import { User } from "@/features/user/types/user.types";
import VehicleForm from "@/features/vehicle/components/form";

import VehicleList from "@/features/vehicle/components/list";
import VehicleApi from "@/features/vehicle/services/vehicle.api";
import { Vehicle, VehicleCreate, VehicleInitial, VehicleUpdate } from "@/features/vehicle/types/vehicle.types";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";

export default  function VehiclePage() {
    const [models, setModels] = useState<Vehicle[]>([]);
    const [users, setUsers] = useState<User[]>([]);
    const [modelsData, setModelsData] = useState<Model[]>([]);
    const [id, setId] = useState<number>(0);
    const [showModal, setShowModal] = useState<boolean>(false);
    const [idDelete, setIdDelete] = useState<number>(0);

    useEffect( () => {
        load();
    }, []);

    const load = async () => {
        const data = await VehicleApi().get();
        const userData = await UserApi().get();
        const modelData = await ModelApi().get();


        setModels(data);
        setUsers(userData);
        setModelsData(modelData);
    }

    const [model, setModel] = useState<VehicleCreate | VehicleUpdate>(VehicleInitial);

    const onSubmit = async (modelPa: VehicleCreate | VehicleUpdate) => {
        if(id){
            const { created_at, updated_at, id, users, model, ...update } = modelPa as Vehicle;
            await VehicleApi().update(id, update);
            Swal.fire({
                title: "Success",
                text: "Vehicle updated successfully",
                icon: "success",
            });
        } else {
            await VehicleApi().create(modelPa as VehicleCreate);
            Swal.fire({
                title: "Success",
                text: "Vehicle created successfully",
                icon: "success",
            });
        }

        setModel(VehicleInitial);
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
            await VehicleApi().deleteModel(id);
            Swal.fire({
                title: "Deleted!",
                text: "Your Vehicle has been deleted.",
                icon: "success",
            });
            setIdDelete(0);
            setShowModal(false);
            load();
        }
    }

    const onEdit = (id:number, model: VehicleUpdate) => {
        setId(id);
        setModel(model);
    }

    return (
        <div>
            <h1 className="text-2xl font-bold">Vehicle Page</h1>
            <hr  className="my-4" />
            <div className="grid grid-cols-4 md:grid-cols-4 gap-4 mb-4">
                <div>
                    <VehicleForm model={model} onSubmit={onSubmit} users={users} models={modelsData} />
                </div>
                <div className="col-span-3">
                    <VehicleList models={models} onEdit={onEdit} onDelete={handleDelete} />
                </div>
            </div>

            {showModal && 
                <Modal onClose={() => setShowModal(false)} onConfirm={() => onDelete(idDelete)} text="Are you sure you want to delete this record?" />
            }
        </div>
    );
}