'use client';
import Button from "@/components/ui/Button";
import { ToolCatalogCreate, ToolCatalogUpdate } from "../types/tool-catalog.types";
import { useEffect, useState } from "react";

interface ToolCatalogFormProps {
    model: ToolCatalogCreate | ToolCatalogUpdate;
    onSubmit: (model: ToolCatalogCreate | ToolCatalogUpdate) => void;
}

export default function ToolCatalogForm(props: ToolCatalogFormProps) {
    const { onSubmit, model } = props;
    const [register, setRegister] = useState<ToolCatalogCreate | ToolCatalogUpdate>(model);

    useEffect(() => {
        setRegister(model);
    }, [model]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit(register);
    }

    return (
        <form onSubmit={handleSubmit}>
            <h2>Register ToolCatalog</h2>
            <input type="text" placeholder="ToolCatalog Name" className="border p-2 mb-2 w-full" value={register?.name || ""} onChange={(e) => setRegister({ ...register, name: e.target.value })} />
            <input type="text" placeholder="ToolCatalog Description" className="border p-2 mb-2 w-full" value={register?.description || ""} onChange={(e) => setRegister({ ...register, description: e.target.value })} />
            <select className="border p-2 mb-2 w-full text-white bg-gray-900" value={register?.state?.toString() || ""} onChange={(e) => setRegister({ ...register, state: +e.target.value })}>
                <option value="">State</option>
                <option value="1">Active</option>
                <option value="0">Inactive</option>
            </select>

            <Button text={"Save ToolCatalog"} color="primary" type="submit" className="w-full"/>
        </form>
    );
}