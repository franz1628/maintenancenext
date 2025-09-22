'use client';
import Button from "@/components/ui/Button";
import { ServiceCreate, ServiceUpdate } from "../types/service.types";
import { useEffect, useState } from "react";
import { Vehicle } from "@/features/vehicle/types/vehicle.types";
import { User } from "@/features/user/types/user.types";
import { ServiceCatalog } from "@/features/service-catalog/types/service-catalog.types";
import { Seller } from "@/features/seller/types/seller.types";

interface ServiceFormProps {
    model: ServiceCreate | ServiceUpdate;
    vehicles: Vehicle[];
    users: User[];
    serviceCatalogs: ServiceCatalog[];
    sellers: Seller[];
    onSubmit: (model: ServiceCreate | ServiceUpdate) => void;
}

export default function ServiceForm(props: ServiceFormProps) {
    const { onSubmit, model, vehicles, users, serviceCatalogs, sellers } = props;
    const [register, setRegister] = useState<ServiceCreate | ServiceUpdate>(model);

    useEffect(() => {
        setRegister(model);
    }, [model]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit(register);
    }

    return (
        <form onSubmit={handleSubmit}>
            <h2>Register Service</h2>
            <select className="border p-2 mb-2 w-full text-white bg-gray-900" value={register?.id_vehicle?.toString() || ""} onChange={(e) => setRegister({ ...register, id_vehicle: +e.target.value })}>
                <option value="">Select Vehicle</option>
                {vehicles.map((vehicle) => (
                    <option key={vehicle.id} value={vehicle.id}>
                        {vehicle.plate}
                    </option>
                ))}
            </select>
            <select className="border p-2 mb-2 w-full text-white bg-gray-900" value={register?.id_user?.toString() || ""} onChange={(e) => setRegister({ ...register, id_user: +e.target.value })}>
                <option value="">Select User</option>
                {users.map((user) => (
                    <option key={user.id} value={user.id}>
                        {user.name} {user.last_name}
                    </option>
                ))}
            </select>
            <select className="border p-2 mb-2 w-full text-white bg-gray-900" value={register?.id_service_catalog?.toString() || ""} onChange={(e) => setRegister({ ...register, id_service_catalog: +e.target.value })}>
                <option value="">Select Service Catalog</option>
                {serviceCatalogs.map((catalog) => (
                    <option key={catalog.id} value={catalog.id}>
                        {catalog.name}
                    </option>
                ))}
            </select>
            <select className="border p-2 mb-2 w-full text-white bg-gray-900" value={register?.id_seller?.toString() || ""} onChange={(e) => setRegister({ ...register, id_seller: +e.target.value })}>
                <option value="">Select Seller</option>
                {sellers.map((seller) => (
                    <option key={seller.id} value={seller.id}>
                        {seller.name} {seller.last_name}
                    </option>
                ))}
            </select>
            <input className="border p-2 mb-2 w-full text-white bg-gray-900" type="date" placeholder="Service Date" value={register?.date_service?.substring(0, 10) || ""} onChange={(e) => setRegister({ ...register, date_service: e.target.value })} />
            <input className="border p-2 mb-2 w-full text-white bg-gray-900" type="number" placeholder="Total" value={register?.total?.toString() || ""} onChange={(e) => setRegister({ ...register, total: +e.target.value })} />
            <input className="border p-2 mb-2 w-full text-white bg-gray-900" type="text" placeholder="Status" value={register?.status || ""} onChange={(e) => setRegister({ ...register, status: e.target.value })} />
            <input className="border p-2 mb-2 w-full text-white bg-gray-900" type="text" placeholder="Observations" value={register?.observations || ""} onChange={(e) => setRegister({ ...register, observations: e.target.value })} />
            <input className="border p-2 mb-2 w-full text-white bg-gray-900" type="datetime-local" placeholder="Initial Date" value={register?.date_initial?.substring(0, 19) || ""} onChange={(e) => setRegister({ ...register, date_initial: e.target.value })} />
            <input className="border p-2 mb-2 w-full text-white bg-gray-900" type="datetime-local" placeholder="Final Date" value={register?.date_final?.substring(0, 19) || ""} onChange={(e) => setRegister({ ...register, date_final: e.target.value })} />

            <select className="border p-2 mb-2 w-full text-white bg-gray-900" value={register?.state?.toString() || ""} onChange={(e) => setRegister({ ...register, state: +e.target.value })}>
                <option value="">State</option>
                <option value="1">Active</option>
                <option value="0">Inactive</option>
            </select>

            <Button text={"Save Service"} color="primary" type="submit" className="w-full" />
        </form>
    );
}