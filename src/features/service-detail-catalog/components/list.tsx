'use client';
import Button from "@/components/ui/Button";
import { ServiceDetailCatalog, ServiceDetailCatalogUpdate } from "../types/service-detail-catalog.types";

interface ServiceDetailCatalogListProps {
    models: ServiceDetailCatalog[];
    onEdit: (id: number, model: ServiceDetailCatalogUpdate) => void;
    onDelete: (id: number) => void;
}

export default function ServiceDetailCatalogList(props: ServiceDetailCatalogListProps) {
    const {models, onEdit, onDelete} = props;
    return (
        <div>
            <h2>ServiceDetailCatalog List</h2>
            <table className="min-w-full border-collapse border border-gray-200">
                <thead>
                    <tr>
                        <th className="border border-gray-300 px-4 py-2">ID</th>
                        <th className="border border-gray-300 px-4 py-2">Service</th>
                        <th className="border border-gray-300 px-4 py-2">Piece</th>
                        <th className="border border-gray-300 px-4 py-2">Tool</th>
                        <th className="border border-gray-300 px-4 py-2">Description</th>
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
                            <td className="border border-gray-300 px-4 py-2">{model.service_catalog?.name}</td>
                            <td className="border border-gray-300 px-4 py-2">{model.piece_catalog?.name}</td>
                            <td className="border border-gray-300 px-4 py-2">{model.tool_catalog?.name}</td>
                            <td className="border border-gray-300 px-4 py-2">{model.description}</td>
                            <td className="border border-gray-300 px-4 py-2">{model.created_at.substring(0, 10)}</td>
                            <td className="border border-gray-300 px-4 py-2">{model.updated_at.substring(0, 10)}</td>
                            <td className="border border-gray-300 px-4 py-2">
                                {model.state === 1 ? <label className="text-green-500">Active</label> : <label className="text-red-500">Inactive</label>}
                            </td>
                            <td className="border border-gray-300 px-4 py-2">
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