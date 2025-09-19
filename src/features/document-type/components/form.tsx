'use client';
import Button from "@/components/ui/Button";

import { useEffect, useState } from "react";
import { DocumentTypeCreate, DocumentTypeUpdate } from "../types/document-type.types";

interface DocumentTypeFormProps {
    model: DocumentTypeCreate | DocumentTypeUpdate;
    onSubmit: (model: DocumentTypeCreate | DocumentTypeUpdate) => void;
}

export default function DocumentTypeForm(props: DocumentTypeFormProps) {
    const { onSubmit, model } = props;
    const [register, setRegister] = useState<DocumentTypeCreate | DocumentTypeUpdate>(model);

    useEffect(() => {
        setRegister(model);
    }, [model]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit(register);
    }

    return (
        <form onSubmit={handleSubmit}>
            <h2>Register DocumentType</h2>
            <input type="text" placeholder="DocumentType Name" className="border p-2 mb-2 w-full" value={register?.name || ""} onChange={(e) => setRegister({ ...register, name: e.target.value })} />
            <input type="text" placeholder="DocumentType Description" className="border p-2 mb-2 w-full" value={register?.description || ""} onChange={(e) => setRegister({ ...register, description: e.target.value })} />
            <select className="border p-2 mb-2 w-full text-white bg-gray-900" value={register?.state?.toString() || ""} onChange={(e) => setRegister({ ...register, state: +e.target.value })}>
                <option value="">State</option>
                <option value="1">Active</option>
                <option value="0">Inactive</option>
            </select>

            <Button text={"Save DocumentType"} color="primary" type="submit" className="w-full"/>
        </form>
    );
}