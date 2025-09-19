'use client';
import Button from "@/components/ui/Button";
import { UserCreate, UserUpdate } from "../types/user.types";
import { useEffect, useState } from "react";
import { DocumentType } from "@/features/document-type/types/document-type.types";

interface UserFormProps {
    model: UserCreate | UserUpdate;
    documentTypes: DocumentType[];
    onSubmit: (model: UserCreate | UserUpdate) => void;
}

export default function UserForm(props: UserFormProps) {
    const { onSubmit, model, documentTypes } = props;
    const [register, setRegister] = useState<UserCreate | UserUpdate>(model);

    useEffect(() => {
        setRegister(model);
    }, [model]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit(register);
    }

    return (
        <form onSubmit={handleSubmit}>
            <h2>Register User</h2>
            <input type="text" placeholder="Name" className="border p-2 mb-2 w-full" value={register?.name || ""} onChange={(e) => setRegister({ ...register, name: e.target.value })} />
            <input type="text" placeholder="Last Name" className="border p-2 mb-2 w-full" value={register?.last_name || ""} onChange={(e) => setRegister({ ...register, last_name: e.target.value })} />
            <input type="text" placeholder="Second Last Name" className="border p-2 mb-2 w-full" value={register?.second_last_name || ""} onChange={(e) => setRegister({ ...register, second_last_name: e.target.value })} />
            <input type="email" placeholder="Email" className="border p-2 mb-2 w-full" value={register?.email || ""} onChange={(e) => setRegister({ ...register, email: e.target.value })} />
            <input type="password" placeholder="Password" className="border p-2 mb-2 w-full" value={register?.password || ""} onChange={(e) => setRegister({ ...register, password: e.target.value })} />
            <input type="date" placeholder="Birth Date" className="border p-2 mb-2 w-full" value={register?.birth_date || ""} onChange={(e) => setRegister({ ...register, birth_date: e.target.value })} />
            <input type="text" placeholder="Phone" className="border p-2 mb-2 w-full" value={register?.phone || ""} onChange={(e) => setRegister({ ...register, phone: e.target.value })} />
            <input type="text" placeholder="Number Document" className="border p-2 mb-2 w-full" value={register?.number_document || ""} onChange={(e) => setRegister({ ...register, number_document: e.target.value })} />
            <select className="border p-2 mb-2 w-full text-white bg-gray-900" value={register?.id_document_type?.toString() || ""} onChange={(e) => setRegister({ ...register, id_document_type: +e.target.value })}>
                <option value="">Document Type</option>
                {documentTypes?.map((dt) => (
                    <option key={dt.id} value={dt.id}>{dt.name}</option>
                ))}
            </select>
            <select className="border p-2 mb-2 w-full text-white bg-gray-900" value={register?.state?.toString() || ""} onChange={(e) => setRegister({ ...register, state: +e.target.value })}>
                <option value="">State</option>
                <option value="1">Active</option>
                <option value="0">Inactive</option>
            </select>

            <Button text={"Save User"} color="primary" type="submit" className="w-full"/>
        </form>
    );
}