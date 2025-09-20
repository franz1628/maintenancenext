'use client';
import Button from "@/components/ui/Button";
import { Vehicle, VehicleUpdate } from "../types/vehicle.types";

interface VehicleListProps {
    models: Vehicle[];
    onEdit: (id: number, model: VehicleUpdate) => void;
    onDelete: (id: number) => void;
}

export default function VehicleList(props: VehicleListProps) {
    const {models, onEdit, onDelete} = props;
    return (
        <div>
            <h2>Vehicle List</h2>
            <table className="min-w-full border-collapse border border-gray-200">
                <thead>
                    <tr>
                        <th className="border border-gray-300 px-4 py-2">ID</th>
                        <th className="border border-gray-300 px-4 py-2">Plate</th>  
                        <th className="border border-gray-300 px-4 py-2">Color</th>  
                        <th className="border border-gray-300 px-4 py-2">User</th>  
                        <th className="border border-gray-300 px-4 py-2">Model</th>  
                      
                        <th className="border border-gray-300 px-4 py-2">State</th>
                        <th className="border border-gray-300 px-4 py-2">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {models.map((model) => (
                        <tr key={model.id}>
                            <td className="border border-gray-300 px-4 py-2">{model.id}</td>
                            <td className="border border-gray-300 px-4 py-2">{model.plate}</td>
                            <td className="border border-gray-300 px-4 py-2">{model.color}</td>
                            <td className="border border-gray-300 px-4 py-2">{model.users.name + " " + model.users.last_name + " " + model.users.second_last_name}</td>
                            <td className="border border-gray-300 px-4 py-2">{model.model.brand.name + " - " + model.model.name}</td>
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