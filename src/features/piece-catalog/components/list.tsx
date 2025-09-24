'use client';
import Button from "@/components/ui/Button";
import { PieceCatalog, PieceCatalogUpdate } from "../types/piece-catalog.types";

interface PieceCatalogListProps {
    models: PieceCatalog[];
    onEdit: (id: number, model: PieceCatalogUpdate) => void;
    onDelete: (id: number) => void;
}

export default function PieceCatalogList(props: PieceCatalogListProps) {
    const {models, onEdit, onDelete} = props;
    

    const convert = (model: PieceCatalog): PieceCatalogUpdate => {
        const { created_at, updated_at, id, ...update } = model;
        return {...update, price: parseFloat(model.price as unknown as string)};
    }

    return (
        <div>
            <h2>PieceCatalog List</h2>
            <table className="min-w-full border-collapse border border-gray-200">
                <thead>
                    <tr>
                        <th className="border border-gray-300 px-4 py-2">ID</th>
                        <th className="border border-gray-300 px-4 py-2">Name</th>  
                        <th className="border border-gray-300 px-4 py-2">Description</th>
                        <th className="border border-gray-300 px-4 py-2">Price</th>
                        <th className="border border-gray-300 px-4 py-2">Stock</th>
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
                            <td className="border border-gray-300 px-4 py-2">{model.stock}</td>
                            <td className="border border-gray-300 px-4 py-2">{model.created_at.substring(0, 10)}</td>
                            <td className="border border-gray-300 px-4 py-2">{model.updated_at.substring(0, 10)}</td>
                            <td className="border border-gray-300 px-4 py-2">
                                {model.state === 1 ? <label className="text-green-500">Active</label> : <label className="text-red-500">Inactive</label>}
                            </td>
                            <td className="border border-gray-300 px-4 py-2 flex">
                                <Button text="Edit" color="info" onClick={() => onEdit(model.id, convert(model))} />
                                <Button text="Delete" color="danger" onClick={() => onDelete(model.id)} className="ml-2" />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}