'use client';
import Button from "@/components/ui/Button";
import { MecanicCreate, MecanicUpdate } from "../types/mecanic.types";
import { useEffect, useState } from "react";
import { DocumentType } from "@/features/document-type/types/document-type.types";
import Input from "@/components/ui/Input";
import Select from "@/components/ui/Select";

interface MecanicFormProps {
    model: MecanicCreate | MecanicUpdate;
    documentTypes: DocumentType[];
    onSubmit: (model: MecanicCreate | MecanicUpdate) => void;
}

export default function MecanicForm(props: MecanicFormProps) {
    const { onSubmit, model, documentTypes } = props;
    const [register, setRegister] = useState<MecanicCreate | MecanicUpdate>(model);

    useEffect(() => {
        setRegister(model);
    }, [model]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit(register);
    }

    return (
        <form onSubmit={handleSubmit}>
            <h2 className="text-lg font-bold mb-4">Register Mecanic</h2>
            <Input text="Name" value={register?.name || ""} onChange={(e) => setRegister({ ...register, name: e.target.value })} />
            <Input text="Last Name" value={register?.last_name || ""} onChange={(e) => setRegister({ ...register, last_name: e.target.value })} />
            <Input text="Second Last Name" value={register?.second_last_name || ""} onChange={(e) => setRegister({ ...register, second_last_name: e.target.value })} />
            <Input text="Email" value={register?.email || ""} onChange={(e) => setRegister({ ...register, email: e.target.value })} />
            <Input text="Password" value={register?.password || ""} onChange={(e) => setRegister({ ...register, password: e.target.value })} />
            <Input text="Birth Date" value={register?.birth_date?.substring(0, 10) || ""} onChange={(e) => setRegister({ ...register, birth_date: e.target.value })} />
            <Input text="Phone" value={register?.phone || ""} onChange={(e) => setRegister({ ...register, phone: e.target.value })} />
            <Input text="Number Document" value={register?.number_document || ""} onChange={(e) => setRegister({ ...register, number_document: e.target.value })} />
            <Select text="Document Type" value={register?.id_document_type?.toString() || ""} onChange={(e) => setRegister({ ...register, id_document_type: +e.target.value })}>
                <option value="">Document Type</option>
                {documentTypes?.map((dt) => (
                    <option key={dt.id} value={dt.id}>{dt.name}</option>
                ))}
            </Select>
            <Select text="State" value={register?.state?.toString() || ""} onChange={(e) => setRegister({ ...register, state: +e.target.value })}>
                <option value="1">Active</option>
                <option value="0">Inactive</option>
            </Select>

            <Button text={"Save"} color="primary" type="submit" className="w-full"/>
        </form>
    );
}