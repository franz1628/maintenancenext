'use client';
import Button from "@/components/ui/Button";
import { ServiceCatalog, ServiceCatalogUpdate } from "../types/service-catalog.types";

interface ServiceCatalogListProps {
    models: ServiceCatalog[];
    onEdit: (id: number, model: ServiceCatalogUpdate) => void;
    onDelete: (id: number) => void;
}

export default function ServiceCatalogList(props: ServiceCatalogListProps) {
    const {models, onEdit, onDelete} = props;

    const convert = (model: ServiceCatalog): ServiceCatalogUpdate => {
           const { created_at, updated_at, id, ...update } = model;
           return {...update, price: parseFloat(model.price as unknown as string)};
    }
    return (
        <div>
            <h2>ServiceCatalog List</h2>
            <table className="min-w-full border-collapse border border-gray-200">
                <thead>
                    <tr>
                        <th className="border border-gray-300 px-4 py-2">ID</th>
                        <th className="border border-gray-300 px-4 py-2">Name</th>  
                        <th className="border border-gray-300 px-4 py-2">Description</th>
                        <th className="border border-gray-300 px-4 py-2">Price</th>
                        <th className="border border-gray-300 px-4 py-2">Duration (minutes)</th>
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
                            <td className="border border-gray-300 px-4 py-2">{model.name}</td>
                            <td className="border border-gray-300 px-4 py-2">{model.description}</td>
                            <td className="border border-gray-300 px-4 py-2">{model.price}</td>
                            <td className="border border-gray-300 px-4 py-2">{model.duration_minutes}</td>
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