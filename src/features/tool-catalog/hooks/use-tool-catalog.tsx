import { useEffect, useState } from "react";
import ToolCatalogApi from "../services/tool-catalog.api";
import { ToolCatalog, ToolCatalogCreate, ToolCatalogInitial } from "../types/tool-catalog.types";

export default function useToolCatalog() {
    const [models, setModels] = useState<ToolCatalog[]>([]);
    const [model, setModel] = useState<ToolCatalogCreate>(ToolCatalogInitial);

    useEffect( () => {
        const fetchToolCatalogs = async () => {
            setModels(await ToolCatalogApi().get());
        };

        fetchToolCatalogs();
        
    }, []);

    return {
        model, 
        setModel,
        models,
        setModels
    };
}
