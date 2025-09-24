'use client';
import Button from "@/components/ui/Button";
import { ServiceDetailCreate, ServiceDetailUpdate } from "../types/service-detail.types";
import { useEffect, useState } from "react";
import { Service } from "@/features/service/types/service.types";
import { ServiceDetailCatalog } from "@/features/service-detail-catalog/types/service-detail-catalog.types";
import { Mecanic } from "@/features/mecanic/types/mecanic.types";
import Select from "@/components/ui/Select";

interface ServiceDetailFormProps {
    model: ServiceDetailCreate | ServiceDetailUpdate;
    services: Service[];
    serviceDetailCatalogs: ServiceDetailCatalog[];
    mecanicans: Mecanic[];
    onSubmit: (model: ServiceDetailCreate | ServiceDetailUpdate) => void;
}

export default function ServiceDetailForm(props: ServiceDetailFormProps) {
    const { onSubmit, model, services, serviceDetailCatalogs, mecanicans } = props;
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
            <h2 className="text-lg font-bold mb-4">Register ServiceDetail</h2>
            
            <Select text="Service" value={register?.id_service?.toString() || ""} onChange={(e) => setRegister({ ...register, id_service: +e.target.value })}>
                <option value="">Select Service</option>
                {services.map((service) => (
                    <option key={service.id} value={service.id}>{service.id}</option>
                ))}
            </Select>

            <Select text="Service Detail Catalog" value={register?.id_service_detail_catalog?.toString() || ""} onChange={(e) => setRegister({ ...register, id_service_detail_catalog: +e.target.value })}>
                <option value="">Select Service Detail Catalog</option>
                {serviceDetailCatalogs.map((catalog) => (
                    <option key={catalog.id} value={catalog.id}>{catalog.description}</option>
                ))}
            </Select>

            <Select text="Mecanic" value={register?.id_mecanic?.toString() || ""} onChange={(e) => setRegister({ ...register, id_mecanic: +e.target.value })}>
                <option value="">Select Mecanic</option>
                {mecanicans.map((mecanic) => (
                    <option key={mecanic.id} value={mecanic.id}>{mecanic.name + " " + mecanic.last_name + " " + mecanic.second_last_name}</option>
                ))}
            </Select>

            <Select text="State" value={register?.state?.toString() || ""} onChange={(e) => setRegister({ ...register, state: +e.target.value })}>
                <option value="1">Active</option>
                <option value="0">Inactive</option>
            </Select>

            <Button text={"ServiceDetail"} color="primary" type="submit" className="w-full"/>
        </form>
    );
}