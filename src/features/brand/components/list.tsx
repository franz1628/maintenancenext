'use client';
import Button from "@/components/ui/Button";
import { Brand, BrandUpdate } from "../types/brand.types";
import Table from "@/components/ui/Table";
import Badge from "@/components/ui/Badge";
import Image from "@/components/ui/Image";

interface BrandListProps {
    models: Brand[];
    onEdit: (id: number, model: BrandUpdate) => void;
    onDelete: (id: number) => void;
    isLoading?: boolean;
}

export default function BrandList(props: BrandListProps) {
    const {models, onEdit, onDelete, isLoading} = props;
    
    if (!process.env.NEXT_PUBLIC_API_URL_BACKEND) {
        throw new Error("API_URL_BACKEND environment variable is not set. Please configure it before running the application.");
    }
    const URL_BACKEND = process.env.NEXT_PUBLIC_API_URL_BACKEND;
    return (
        <div>
            <Table className="min-w-full border-collapse border border-gray-200">
                <thead>
                    <tr>
                        <th className="border border-gray-300 px-4 py-2">ID</th>
                        <th className="border border-gray-300 px-4 py-2">Name</th>  
                        <th className="border border-gray-300 px-4 py-2">Description</th>
                        <th className="border border-gray-300 px-4 py-2">Photo</th>
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
                            <td className="border border-gray-300 px-4 py-2">
                                {
                                    model.photo && 
                                    <Image 
                                value={new URL(`uploads/brand/${encodeURIComponent(model.photo)}`, URL_BACKEND).toString()} 
                                className="w-16 h-16 object-cover" 
                                modal={true} 
                                />
                                }
                                
                            </td>
                            <td className="border border-gray-300 px-4 py-2">{new Date(model.created_at).toLocaleDateString()}</td>
                            <td className="border border-gray-300 px-4 py-2">{new Date(model.updated_at).toLocaleDateString()}</td>
                            <td className="border border-gray-300 px-4 py-2">
                                {model.state === 1 ? <Badge color="success">Active</Badge> : <Badge color="danger">Inactive</Badge>}
                            </td>
                            <td className="border border-gray-300 px-4 py-2">
                                <div className="flex">
                                    <Button icon="edit" text="Edit" color="info" onClick={() => onEdit(model.id,model)} />
                                    <Button icon="delete" text="Delete" color="danger" onClick={() => onDelete(model.id)} className="ml-2" />
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </div>
    );
}