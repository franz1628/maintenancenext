'use client';
import Button from "@/components/ui/Button";
import { DocumentType, DocumentTypeUpdate } from "../types/document-type.types";

interface DocumentTypeListProps {
    models: DocumentType[];
    onEdit: (id: number, model: DocumentTypeUpdate) => void;
    onDelete: (id: number) => void;
}

export default function DocumentTypeList(props: DocumentTypeListProps) {
    const {models, onEdit, onDelete} = props;
    return (
        <div>
            <h2>DocumentType List</h2>
            <table className="min-w-full border-collapse border border-gray-200">
                <thead>
                    <tr>
                        <th className="border border-gray-300 px-4 py-2">ID</th>
                        <th className="border border-gray-300 px-4 py-2">Name</th>  
                        <th className="border border-gray-300 px-4 py-2">Description</th>
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