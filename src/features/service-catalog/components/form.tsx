'use client';
import Button from "@/components/ui/Button";
import { ServiceCatalogCreate, ServiceCatalogUpdate } from "../types/service-catalog.types";
import { useEffect, useState } from "react";
import Input from "@/components/ui/Input";
import Select from "@/components/ui/Select";

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
            <h2 className="text-lg font-bold mb-4">Register ServiceCatalog</h2>
            <Input text="Name" value={register?.name || ""} onChange={(e) => setRegister({ ...register, name: e.target.value })} />
            <Input text="Description" value={register?.description || ""} onChange={(e) => setRegister({ ...register, description: e.target.value })} />
            <Input step="0.01" text="Price" value={register?.price || 0} onChange={(e) => setRegister({ ...register, price: +e.target.value })} />
            <Input text="Duration (minutes)" value={register?.duration_minutes || 0} onChange={(e) => setRegister({ ...register, duration_minutes: +e.target.value })} />
            <Select text="State" value={register?.state?.toString() || ""} onChange={(e) => setRegister({ ...register, state: +e.target.value })}>
                <option value="">State</option>
                <option value="1">Active</option>
                <option value="0">Inactive</option>
            </Select>

            <Button text={"ServiceCatalog"} color="primary" type="submit" className="w-full"/>
        </form>
    );
}