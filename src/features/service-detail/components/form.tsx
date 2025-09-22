'use client';
import Button from "@/components/ui/Button";
import { ServiceDetailCreate, ServiceDetailUpdate } from "../types/service-detail.types";
import { useEffect, useState } from "react";

interface ServiceDetailFormProps {
    model: ServiceDetailCreate | ServiceDetailUpdate;
    onSubmit: (model: ServiceDetailCreate | ServiceDetailUpdate) => void;
}

export default function ServiceDetailForm(props: ServiceDetailFormProps) {
    const { onSubmit, model } = props;
    const [register, setRegister] = useState<ServiceDetailCreate | ServiceDetailUpdate>(model);

    useEffect(() => {
        setRegister(model);
    }, [model]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit(register);
    }

    return (
        <form onSubmit={handleSubmit}>
            <h2>Register ServiceDetail</h2>
            
            <select className="border p-2 mb-2 w-full text-white bg-gray-900" value={register?.state?.toString() || ""} onChange={(e) => setRegister({ ...register, state: +e.target.value })}>
                <option value="">State</option>
                <option value="1">Active</option>
                <option value="0">Inactive</option>
            </select>

            <Button text={"Save ServiceDetail"} color="primary" type="submit" className="w-full"/>
        </form>
    );
}