'use client';
import Button from "@/components/ui/Button";
import { ModelCreate, ModelUpdate } from "../types/model.types";
import { useEffect, useState } from "react";
import { Brand } from "@/features/brand/types/brand.types";
import Input from "@/components/ui/Input";
import Select from "@/components/ui/Select";

interface ModelFormProps {
    model: ModelCreate | ModelUpdate;
    onSubmit: (model: ModelCreate | ModelUpdate) => void;
    brands: Brand[];
    isLoading: boolean;
}

export default function ModelForm(props: ModelFormProps) {
    const { onSubmit, model, brands, isLoading } = props;
    const [register, setRegister] = useState<ModelCreate | ModelUpdate>(model);

    useEffect(() => {
        console.log(model);
        
        setRegister(model);
    }, [model]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit(register);
    }

    return (
        <form onSubmit={handleSubmit}>
            <h2 className="text-lg font-bold mb-4">Register Model</h2>
            <Input text="Name" value={register?.name || ""} onChange={(e) => setRegister({ ...register, name: e.target.value })} />
            <Input text="Description" value={register?.description || ""} onChange={(e) => setRegister({ ...register, description: e.target.value })} />

            <Select text="Brand" value={register?.id_brand?.toString() || ""} onChange={(e) => setRegister({ ...register, id_brand: +e.target.value })}>
                <option value="">Select Brand</option>
                {brands.map((brand) => (
                    <option key={brand.id} value={brand.id}>
                        {brand.name}
                    </option>
                ))}
            </Select>

            <Select text="State" value={register?.state?.toString() || ""} onChange={(e) => setRegister({ ...register, state: +e.target.value })}>
                <option value="1">Active</option>
                <option value="0">Inactive</option>
            </Select>

            <Button text={isLoading ? "Loading..." : "Submit"} color="primary" type="submit" className="w-full" disabled={isLoading} />
        </form>
    );
}