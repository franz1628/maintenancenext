'use client';
import Button from "@/components/ui/Button";
import { Brand, BrandUpdate } from "../types/brand.types";

interface BrandListProps {
    models: Brand[];
    onEdit: (id: number, model: BrandUpdate) => void;
    onDelete: (id: number) => void;
    isLoading?: boolean;
}

export default function BrandList(props: BrandListProps) {
    const {models, onEdit, onDelete, isLoading} = props;
    return (
        <div>
            <h2>Brand List</h2>
            <table className="min-w-full border-collapse border border-gray-200">
                <thead>
                    <tr>
                        <th className="border border-gray-300 px-4 py-2">ID</th>
                        <th className="border border-gray-300 px-4 py-2">Name</th>  
                        <th className="border border-gray-300 px-4 py-2">Description</th>
                        <th className="border border-gray-300 px-4 py-2">Created At</th>
                        <th className="border border-gray-300 px-4 py-2">Updated At</th>
                        <th className="border border-gray-300 px-4 py-2">State</th>
                        <th className="border border-gray-300 px-4 py-2">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {isLoading ? <tr><td colSpan={7} className="text-center">Loading...</td></tr> : models.map((model) => (
                        <tr key={model.id}>
                            <td className="border border-gray-300 px-4 py-2">{model.id}</td>
                            <td className="border border-gray-300 px-4 py-2">{model.name}</td>
                            <td className="border border-gray-300 px-4 py-2">{model.description}</td>
                            <td className="border border-gray-300 px-4 py-2">{model.created_at.substring(0, 10)}</td>
                            <td className="border border-gray-300 px-4 py-2">{model.updated_at.substring(0, 10)}</td>
                            <td className="border border-gray-300 px-4 py-2">
                                {model.state === 1 ? <label className="text-green-500">Active</label> : <label className="text-red-500">Inactive</label>}
                            </td>
                            {/* input group */}
                            <td className="border border-gray-300 px-4 py-2 flex">
                                <Button icon="edit" text="Edit" color="info" onClick={() => onEdit(model.id,model)} />
                                <Button icon="delete" text="Delete" color="danger" onClick={() => onDelete(model.id)} className="ml-2" />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}