'use client';
import Button from "@/components/ui/Button";
import { User, UserUpdate } from "../types/user.types";

interface UserListProps {
    models: User[];
    onEdit: (id: number, model: UserUpdate) => void;
    onDelete: (id: number) => void;
}

export default function UserList(props: UserListProps) {
    const {models, onEdit, onDelete} = props;
    return (
        <div>
            <h2>User List</h2>
            <table className="min-w-full border-collapse border border-gray-200">
                <thead>
                    <tr>
                        <th className="border border-gray-300 px-4 py-2">ID</th>
                        <th className="border border-gray-300 px-4 py-2">Names</th>  
                        <th className="border border-gray-300 px-4 py-2">Email</th>  
                        <th className="border border-gray-300 px-4 py-2">Phone</th>  
                        <th className="border border-gray-300 px-4 py-2">Document Number</th>
                        <th className="border border-gray-300 px-4 py-2">State</th>
                        <th className="border border-gray-300 px-4 py-2">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {models.map((model) => (
                        <tr key={model.id}>
                            <td className="border border-gray-300 px-4 py-2">{model.id}</td>
                            <td className="border border-gray-300 px-4 py-2">{model.name + " " + model.last_name + " " + model.second_last_name}</td>
                            <td className="border border-gray-300 px-4 py-2">{model.email}</td>
                            <td className="border border-gray-300 px-4 py-2">{model.phone}</td>
                            <td className="border border-gray-300 px-4 py-2">{model.document_type.name + " - " + model.number_document}</td>
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