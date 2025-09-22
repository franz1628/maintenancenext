'use client';
import Button from "@/components/ui/Button";
import { Service, ServiceUpdate } from "../types/service.types";
import { ServiceCatalogUpdate } from "@/features/service-catalog/types/service-catalog.types";

interface ServiceListProps {
    models: Service[];
    onEdit: (id: number, model: ServiceUpdate) => void;
    onDelete: (id: number) => void;
}

export default function ServiceList(props: ServiceListProps) {
    const {models, onEdit, onDelete} = props;

    const convert = (model: Service): ServiceUpdate => {
        const { created_at, updated_at, id, vehicle, users, service_catalog, seller, ...update } = model;
        return {...update, total: parseFloat(model.total)};
    }

    return (
        <div>
            <h2>Service List</h2>
            <table className="min-w-full border-collapse border border-gray-200">
                <thead>
                    <tr>
                        <th className="border border-gray-300 px-4 py-2">ID</th>
                        <th className="border border-gray-300 px-4 py-2">Vehicle</th>
                        <th className="border border-gray-300 px-4 py-2">User</th>
                        <th className="border border-gray-300 px-4 py-2">Date</th>
                        <th className="border border-gray-300 px-4 py-2">Service Catalog</th>
                        <th className="border border-gray-300 px-4 py-2">Seller</th>
                        <th className="border border-gray-300 px-4 py-2">Total</th>
                        <th className="border border-gray-300 px-4 py-2">Observations</th>
                        <th className="border border-gray-300 px-4 py-2">Initial</th>
                        <th className="border border-gray-300 px-4 py-2">Final</th>
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
                            <td className="border border-gray-300 px-4 py-2">{model.vehicle.plate}</td>
                            <td className="border border-gray-300 px-4 py-2">{model.users.name + " " + model.users.last_name + " " + model.users.second_last_name}</td>
                            <td className="border border-gray-300 px-4 py-2">{model.date_service.substring(0, 10)}</td>
                            <td className="border border-gray-300 px-4 py-2">{model.service_catalog.name}</td>
                            <td className="border border-gray-300 px-4 py-2">{model.seller.name}</td>
                            <td className="border border-gray-300 px-4 py-2">{model.total}</td>
                            <td className="border border-gray-300 px-4 py-2">{model.observations}</td>
                            <td className="border border-gray-300 px-4 py-2">{model.date_initial?.substring(0, 16)}</td>
                            <td className="border border-gray-300 px-4 py-2">{model.date_final?.substring(0, 16)}</td>
                            <td className="border border-gray-300 px-4 py-2">{model.created_at.substring(0, 10)}</td>
                            <td className="border border-gray-300 px-4 py-2">{model.updated_at.substring(0, 10)}</td>
                            <td className="border border-gray-300 px-4 py-2">
                                {model.state === 1 ? <label className="text-green-500">Active</label> : <label className="text-red-500">Inactive</label>}
                            </td>
                            <td className="border border-gray-300 px-4 py-2">
                                <Button text="Edit" color="info" onClick={() => onEdit(model.id,convert(model))} />
                                <Button text="Delete" color="danger" onClick={() => onDelete(model.id)} className="ml-2" />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}