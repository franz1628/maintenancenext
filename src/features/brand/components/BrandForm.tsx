'use client';

import Button from "@/components/ui/Button";
import BrandApi from "../services/brand.api";
import { BrandCreate, BrandUpdate } from "../types/brand.types";
import { useEffect, useState } from "react";


interface BrandFormProps {
    model: BrandCreate | BrandUpdate;
    onSubmit: (brand: BrandCreate | BrandUpdate) => void;
}
export default function BrandForm(props: BrandFormProps) {
    const { onSubmit, model } = props;
    const [register, setRegister] = useState<BrandCreate | BrandUpdate>(model);

    useEffect(() => {
        setRegister(model);
    }, [model]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit(register);
    }

    return (
        <form onSubmit={handleSubmit}>
            <h2>Register Brand</h2>
            <input type="text" placeholder="Brand Name" className="border p-2 mb-2 w-full" value={register?.name || ""} onChange={(e) => setRegister({ ...register, name: e.target.value })} />
            <input type="text" placeholder="Brand Description" className="border p-2 mb-2 w-full" value={register?.description || ""} onChange={(e) => setRegister({ ...register, description: e.target.value })} />
            <select className="border p-2 mb-2 w-full" value={register?.state || ""} onChange={(e) => setRegister({ ...register, state: +e.target.value })}>
                <option value="">State</option>
                <option value="1">Active</option>
                <option value="0">Inactive</option>
            </select>

            <Button text="Save Brand" color="primary" type="submit" className="w-full"/>
        </form>
    );
}