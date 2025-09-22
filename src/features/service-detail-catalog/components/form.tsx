'use client';
import Button from "@/components/ui/Button";
import { ServiceDetailCatalogCreate, ServiceDetailCatalogUpdate } from "../types/service-detail-catalog.types";
import { useEffect, useState } from "react";
import { PieceCatalog } from "@/features/piece-catalog/types/piece-catalog.types";
import { ToolCatalog } from "@/features/tool-catalog/types/tool-catalog.types";
import { ServiceCatalog } from "@/features/service-catalog/types/service-catalog.types";
import Input from "@/components/ui/Input";
import Select from "@/components/ui/Select";

interface ServiceDetailCatalogFormProps {
    model: ServiceDetailCatalogCreate | ServiceDetailCatalogUpdate;
    onSubmit: (model: ServiceDetailCatalogCreate | ServiceDetailCatalogUpdate) => void;
    serviceCatalogs: ServiceCatalog[];
    pieceCatalogs: PieceCatalog[];
    toolCatalogs: ToolCatalog[];
}

export default function ServiceDetailCatalogForm(props: ServiceDetailCatalogFormProps) {
    const { onSubmit, model } = props;
    const [register, setRegister] = useState<ServiceDetailCatalogCreate | ServiceDetailCatalogUpdate>(model);

    useEffect(() => {
        setRegister(model);
    }, [model]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit(register);
    }

    return (
        <form onSubmit={handleSubmit}>
            <h2 className="text-lg font-bold mb-4">Register ServiceDetailCatalog</h2>
            <Input type="text" text="Description" className="border p-2 mb-2 w-full" value={register?.description || ""} onChange={(e) => setRegister({ ...register, description: e.target.value })} />
            

            <Select text="Service Catalog" value={register?.id_service_catalog?.toString() || ""} onChange={(e) => setRegister({ ...register, id_service_catalog: +e.target.value })}>
                <option value="">Select Service Catalog</option>
                {props.serviceCatalogs.map((serviceCatalog) => (
                    <option key={serviceCatalog.id} value={serviceCatalog.id}>{serviceCatalog.name}</option>
                ))}
            </Select>

            <Select text="Piece Catalog" value={register?.id_piece_catalog?.toString() || ""} onChange={(e) => setRegister({ ...register, id_piece_catalog: +e.target.value })}>
                <option value="">Select Piece Catalog</option>
                {props.pieceCatalogs.map((pieceCatalog) => (
                    <option key={pieceCatalog.id} value={pieceCatalog.id}>{pieceCatalog.name}</option>
                ))}
            </Select>

            <Select text="Tool Catalog" value={register?.id_tool_catalog?.toString() || ""} onChange={(e) => setRegister({ ...register, id_tool_catalog: +e.target.value })}>
                <option value="">Select Tool Catalog</option>
                {props.toolCatalogs.map((toolCatalog) => (
                    <option key={toolCatalog.id} value={toolCatalog.id}>{toolCatalog.name}</option>
                ))}
            </Select>

            <Select text="State" value={register?.state?.toString() || ""} onChange={(e) => setRegister({ ...register, state: +e.target.value })}>
                <option value="1">Active</option>
                <option value="0">Inactive</option>
            </Select>

            <Button text={"ServiceDetailCatalog"} color="primary" type="submit" className="w-full"/>
        </form>
    );
}