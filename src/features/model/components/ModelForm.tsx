'use client';
import Button from "@/components/ui/Button";
import { ModelCreate, ModelUpdate } from "../types/model.types";
import { useEffect, useState } from "react";
import { Brand } from "@/features/brand/types/brand.types";

interface ModelFormProps {
    model: ModelCreate | ModelUpdate;
    onSubmit: (model: ModelCreate | ModelUpdate) => void;
    brands: Brand[];
}

export default function ModelForm(props: ModelFormProps) {
    const { onSubmit, model, brands } = props;
    const [register, setRegister] = useState<ModelCreate | ModelUpdate>(model);

    useEffect(() => {
        setRegister(model);
    }, [model]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit(register);
    }

    return (
        <form onSubmit={handleSubmit}>
            <h2>Register Model</h2>
            <input type="text" placeholder="Model Name" className="border p-2 mb-2 w-full" value={register?.name || ""} onChange={(e) => setRegister({ ...register, name: e.target.value })} />
            <input type="text" placeholder="Model Description" className="border p-2 mb-2 w-full" value={register?.description || ""} onChange={(e) => setRegister({ ...register, description: e.target.value })} />

            <select className="border p-2 mb-2 w-full text-white bg-gray-900" value={register?.id_brand?.toString() || ""} onChange={(e) => setRegister({ ...register, id_brand: +e.target.value })}>
                <option value="">Select Brand</option>
                {brands.map((brand) => (
                    <option key={brand.id} value={brand.id}>
                        {brand.name}
                    </option>
                ))}
            </select>

            <select className="border p-2 mb-2 w-full text-white bg-gray-900" value={register?.state?.toString() || ""} onChange={(e) => setRegister({ ...register, state: +e.target.value })}>
                <option value="">State</option>
                <option value="1">Active</option>
                <option value="0">Inactive</option>
            </select>

            <Button text={"Save Brand"} color="primary" type="submit" className="w-full"/>
        </form>
    );
}