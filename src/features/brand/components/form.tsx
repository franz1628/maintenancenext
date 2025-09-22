'use client';
import Button from "@/components/ui/Button";
import { BrandCreate, BrandUpdate } from "../types/brand.types";
import { useEffect, useState } from "react";
import Input from "@/components/ui/Input";
import Select from "@/components/ui/Select";

interface BrandFormProps {
    model: BrandCreate | BrandUpdate;
    onSubmit: (model: BrandCreate | BrandUpdate) => void;
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
            <h2 className="text-lg font-bold mb-4">Register Brand</h2>
            
            <Input text="Name" value={register?.name || ""} onChange={(e) => setRegister({ ...register, name: e.target.value })}/>
            <Input text="Description" value={register?.description || ""} onChange={(e) => setRegister({ ...register, description: e.target.value })}/>
            <Select text="State" value={register?.state?.toString() || ""} onChange={(e) => setRegister({ ...register, state: +e.target.value })}>
                <option value="1">Active</option>
                <option value="0">Inactive</option>
            </Select>

            <Button text={"Save"} color="primary" type="submit" className="w-full"/>
        </form>
    );
}