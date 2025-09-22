'use client';
import Button from "@/components/ui/Button";
import { ToolCatalogCreate, ToolCatalogUpdate } from "../types/tool-catalog.types";
import { useEffect, useState } from "react";
import Input from "@/components/ui/Input";
import Select from "@/components/ui/Select";

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
            <h2 className="text-lg font-bold mb-4">Register ToolCatalog</h2>
            <Input type="text" text="Name" value={register?.name || ""} onChange={(e) => setRegister({ ...register, name: e.target.value })} />
            <Input type="text" text="Description" value={register?.description || ""} onChange={(e) => setRegister({ ...register, description: e.target.value })} />
            <Select text="State" value={register?.state?.toString() || ""} onChange={(e) => setRegister({ ...register, state: +e.target.value })}>
          
                <option value="1">Active</option>
                <option value="0">Inactive</option>
            </Select>

            <Button text={"ToolCatalog"} color="primary" type="submit" className="w-full"/>
        </form>
    );
}