'use client';
import Button from "@/components/ui/Button";
import { PieceCatalogCreate, PieceCatalogUpdate } from "../types/piece-catalog.types";
import { useEffect, useState } from "react";

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
            <h2>Register PieceCatalog</h2>
            <input type="text" placeholder="Name" className="border p-2 mb-2 w-full" value={register?.name || ""} onChange={(e) => setRegister({ ...register, name: e.target.value })} />
            <input type="text" placeholder="Description" className="border p-2 mb-2 w-full" value={register?.description || ""} onChange={(e) => setRegister({ ...register, description: e.target.value })} />
            <input type="number" placeholder="Price" className="border p-2 mb-2 w-full" value={register?.price || ""} onChange={(e) => setRegister({ ...register, price: parseFloat(e.target.value) })} />
            <input type="number" placeholder="Stock" className="border p-2 mb-2 w-full" value={register?.stock || ""} onChange={(e) => setRegister({ ...register, stock: +e.target.value })} />
            <select className="border p-2 mb-2 w-full text-white bg-gray-900" value={register?.state?.toString() || ""} onChange={(e) => setRegister({ ...register, state: +e.target.value })}>
                <option value="">State</option>
                <option value="1">Active</option>
                <option value="0">Inactive</option>
            </select>

            <Button text={"Save PieceCatalog"} color="primary" type="submit" className="w-full"/>
        </form>
    );
}