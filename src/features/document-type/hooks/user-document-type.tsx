import { useEffect, useState } from "react";
import DocumentTypeApi from "../services/document-type.api";
import { DocumentType, DocumentTypeCreate, DocumentTypeInitial } from "../types/document-type.types";

export default function useDocumentType() {
    const [models, setModels] = useState<DocumentType[]>([]);
    const [model, setModel] = useState<DocumentTypeCreate>(DocumentTypeInitial);

    useEffect( () => {
        const fetchDocumentTypes = async () => {
            setModels(await DocumentTypeApi().get());
        };

        fetchDocumentTypes();
        
    }, []);

    return {
        model, 
        setModel,
        models,
        setModels
    };
}
