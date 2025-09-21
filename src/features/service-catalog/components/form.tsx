'use client';
import Button from "@/components/ui/Button";
import { ServiceCatalogCreate, ServiceCatalogUpdate } from "../types/service-catalog.types";
import { useEffect, useState } from "react";

interface ServiceCatalogFormProps {
    model: ServiceCatalogCreate | ServiceCatalogUpdate;
    onSubmit: (model: ServiceCatalogCreate | ServiceCatalogUpdate) => void;
}

export default function ServiceCatalogForm(props: ServiceCatalogFormProps) {
    const { onSubmit, model } = props;
    const [register, setRegister] = useState<ServiceCatalogCreate | ServiceCatalogUpdate>(model);

    useEffect(() => {
        setRegister(model);
    }, [model]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit(register);
    }

    return (
        <form onSubmit={handleSubmit}>
            <h2>Register ServiceCatalog</h2>
            <input type="text" placeholder="ServiceCatalog Name" className="border p-2 mb-2 w-full" value={register?.name || ""} onChange={(e) => setRegister({ ...register, name: e.target.value })} />
            <input type="text" placeholder="ServiceCatalog Description" className="border p-2 mb-2 w-full" value={register?.description || ""} onChange={(e) => setRegister({ ...register, description: e.target.value })} />
            <input type="number" step="0.01" placeholder="ServiceCatalog Price" className="border p-2 mb-2 w-full" value={register?.price || 0} onChange={(e) => setRegister({ ...register, price: +e.target.value })} />
            <input type="text" placeholder="ServiceCatalog Duration (minutes)" className="border p-2 mb-2 w-full" value={register?.duration_minutes || 0} onChange={(e) => setRegister({ ...register, duration_minutes: +e.target.value })} />
            <select className="border p-2 mb-2 w-full text-white bg-gray-900" value={register?.state?.toString() || ""} onChange={(e) => setRegister({ ...register, state: +e.target.value })}>
                <option value="">State</option>
                <option value="1">Active</option>
                <option value="0">Inactive</option>
            </select>

            <Button text={"Save ServiceCatalog"} color="primary" type="submit" className="w-full"/>
        </form>
    );
}