'use client';
import Button from "@/components/ui/Button";
import { VehicleCreate, VehicleUpdate } from "../types/vehicle.types";
import { useEffect, useState } from "react";
import { User } from "@/features/user/types/user.types";
import { Model } from "@/features/model/types/model.types";

interface VehicleFormProps {
    model: VehicleCreate | VehicleUpdate;
    onSubmit: (model: VehicleCreate | VehicleUpdate) => void;
    users : User[];
    models : Model[];
}

export default function VehicleForm(props: VehicleFormProps) {
    const { onSubmit, model, users, models } = props;
    const [register, setRegister] = useState<VehicleCreate | VehicleUpdate>(model);

    useEffect(() => {
        setRegister(model);
    }, [model]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit(register);
    }

    return (
        <form onSubmit={handleSubmit}>
            <h2>Register Vehicle</h2>
            <input type="text" placeholder="Vehicle Plate" className="border p-2 mb-2 w-full" value={register?.plate || ""} onChange={(e) => setRegister({ ...register, plate: e.target.value })} />
            <input type="text" placeholder="Vehicle Color" className="border p-2 mb-2 w-full" value={register?.color || ""} onChange={(e) => setRegister({ ...register, color: e.target.value })} />

            <select className="border p-2 mb-2 w-full text-white bg-gray-900" value={register?.id_user?.toString() || ""} onChange={(e) => setRegister({ ...register, id_user: +e.target.value })}>
                <option value="">Select User</option>
                {users.map((user) => (
                    <option key={user.id} value={user.id}>{user.name}</option>
                ))}
            </select>

            <select className="border p-2 mb-2 w-full text-white bg-gray-900" value={register?.id_model?.toString() || ""} onChange={(e) => setRegister({ ...register, id_model: +e.target.value })}>
                <option value="">Select Model</option>
                {models.map((model) => (
                    <option key={model.id} value={model.id}>{model.name}</option>
                ))}
            </select>           

          
            <select className="border p-2 mb-2 w-full text-white bg-gray-900" value={register?.state?.toString() || ""} onChange={(e) => setRegister({ ...register, state: +e.target.value })}>
                <option value="">State</option>
                <option value="1">Active</option>
                <option value="0">Inactive</option>
            </select>

            <Button text={"Save Vehicle"} color="primary" type="submit" className="w-full"/>
        </form>
    );
}