'use client';
import Button from "@/components/ui/Button";
import { BrandCreate, BrandInitial, BrandUpdate } from "../types/brand.types";
import { useEffect, useRef, useState } from "react";
import Input from "@/components/ui/Input";
import Select from "@/components/ui/Select";
import Image from "@/components/ui/Image";

interface BrandFormProps {
    model: BrandCreate | BrandUpdate;
    onSubmit: (model: BrandCreate | BrandUpdate, image: File | null) => void;
    isLoading: boolean;
    onReset?: () => void;
}

export default function BrandForm(props: BrandFormProps) {
    const { onSubmit, model, isLoading, onReset } = props;
    const [register, setRegister] = useState<BrandCreate | BrandUpdate>(model);
    const [image, setImage] = useState<File | null>(null);

    const URL_UPLOADS = process.env.NEXT_PUBLIC_URL_UPLOADS || "http://localhost:3000/uploads";

    useEffect(() => {
        setRegister(model);
    }, [model]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit(register, image);
    }

    const handleReset = () => {
        onReset && onReset();
    }

    return (
        <form onSubmit={handleSubmit}>
            <h2 className="text-lg font-bold mb-4">Register Brand</h2>
            
            <Input text="Name" value={register?.name || ""} onChange={(e) => setRegister({ ...register, name: e.target.value })}/>
            <Input text="Description" value={register?.description || ""} onChange={(e) => setRegister({ ...register, description: e.target.value })}/>
            <Input type="file" text="Image" onChange={(e) => setImage(e.target.files ? e.target.files[0] : null)}/>

            <Image  text="Brand Image" value={URL_UPLOADS + "/brand/" + register.photo} modal={true}/>
            <Select text="State" value={register?.state?.toString() || ""} onChange={(e) => setRegister({ ...register, state: +e.target.value })}>
                <option value="1">Active</option>
                <option value="0">Inactive</option>
            </Select>

            <div className="mt-4 grid grid-cols-2 gap-2">
                <Button icon="save" text={isLoading ? "Saving..." : "Save"} color="primary" type="submit" className="w-full" disabled={isLoading}/>
                <Button icon="clear" text="Clear" color="secondary" className="w-full" onClick={handleReset} disabled={isLoading}/>
            </div>
        </form>
    );
}