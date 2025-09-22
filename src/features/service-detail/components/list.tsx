'use client';
import Button from "@/components/ui/Button";
import { ServiceDetail, ServiceDetailUpdate } from "../types/service-detail.types";
import { Service } from "@/features/service/types/service.types";
import { ServiceDetailCatalog } from "@/features/service-detail-catalog/types/service-detail-catalog.types";
import { Mecanic } from "@/features/mecanic/types/mecanic.types";

interface ServiceDetailListProps {
    models: ServiceDetail[];
    onEdit: (id: number, model: ServiceDetailUpdate) => void;
    onDelete: (id: number) => void;
}

export default function ServiceDetailList(props: ServiceDetailListProps) {
    const {models, onEdit, onDelete} = props;
    return (
        <div>
            <h2>ServiceDetail List</h2>
            <table className="min-w-full border-collapse border border-gray-200">
                <thead>
                    <tr>
                        <th className="border border-gray-300 px-4 py-2">ID</th>
                        <th className="border border-gray-300 px-4 py-2">Plate</th>
                        <th className="border border-gray-300 px-4 py-2">Service Detail Catalog</th>
                        <th className="border border-gray-300 px-4 py-2">Mecanic</th>
                        <th className="border border-gray-300 px-4 py-2">Created At</th>
                        <th className="border border-gray-300 px-4 py-2">Updated At</th>
                        <th className="border border-gray-300 px-4 py-2">State</th>
                        <th className="border border-gray-300 px-4 py-2">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {models.map((model) => (
                        <tr key={model.id}>
                            <td className="border border-gray-300 px-4 py-2">{model.id}</td>
                            <td className="border border-gray-300 px-4 py-2">{model.service.vehicle.plate}</td>
                            <td className="border border-gray-300 px-4 py-2">{model.service_detail_catalog.description}</td>
                            <td className="border border-gray-300 px-4 py-2">{model.mecanic.name + " " + model.mecanic.last_name + " " + model.mecanic.second_last_name}</td>
                            <td className="border border-gray-300 px-4 py-2">{model.created_at.substring(0, 10)}</td>
                            <td className="border border-gray-300 px-4 py-2">{model.updated_at.substring(0, 10)}</td>
                            <td className="border border-gray-300 px-4 py-2">
                                {model.state === 1 ? <label className="text-green-500">Active</label> : <label className="text-red-500">Inactive</label>}
                            </td>
                            <td className="border border-gray-300 px-4 py-2 flex">
                                <Button text="Edit" color="info" onClick={() => onEdit(model.id,model)} />
                                <Button text="Delete" color="danger" onClick={() => onDelete(model.id)} className="ml-2" />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}