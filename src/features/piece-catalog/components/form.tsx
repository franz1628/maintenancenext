'use client';
import Button from "@/components/ui/Button";
import { PieceCatalogCreate, PieceCatalogUpdate } from "../types/piece-catalog.types";
import { useEffect, useState } from "react";
import Input from "@/components/ui/Input";
import Select from "@/components/ui/Select";

interface PieceCatalogFormProps {
    model: PieceCatalogCreate | PieceCatalogUpdate;
    onSubmit: (model: PieceCatalogCreate | PieceCatalogUpdate) => void;
}

export default function PieceCatalogForm(props: PieceCatalogFormProps) {
    const { onSubmit, model } = props;
    const [register, setRegister] = useState<PieceCatalogCreate | PieceCatalogUpdate>(model);

    useEffect(() => {
        setRegister(model);
    }, [model]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit(register);
    }

    return (
        <form onSubmit={handleSubmit}>
            <h2 className="text-lg font-bold mb-4">Register PieceCatalog</h2>
            <Input text="Name" value={register?.name || ""} onChange={(e) => setRegister({ ...register, name: e.target.value })} />
            <Input text="Description" value={register?.description || ""} onChange={(e) => setRegister({ ...register, description: e.target.value })} />
            <Input text="Price" value={register?.price || ""} onChange={(e) => setRegister({ ...register, price: parseFloat(e.target.value) })} />
            <Input text="Stock" value={register?.stock || ""} onChange={(e) => setRegister({ ...register, stock: +e.target.value })} />
            <Select text="State" value={register?.state?.toString() || ""} onChange={(e) => setRegister({ ...register, state: +e.target.value })}>
                <option value="1">Active</option>
                <option value="0">Inactive</option>
            </Select>

            <Button text={"PieceCatalog"} color="primary" type="submit" className="w-full"/>
        </form>
    );
}