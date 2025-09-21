import { useEffect, useState } from "react";
import PieceCatalogApi from "../services/piece-catalog.api";
import { PieceCatalog, PieceCatalogCreate, PieceCatalogInitial } from "../types/piece-catalog.types";

export default function usePieceCatalog() {
    const [models, setModels] = useState<PieceCatalog[]>([]);
    const [model, setModel] = useState<PieceCatalogCreate>(PieceCatalogInitial);

    useEffect( () => {
        const fetchPieceCatalogs = async () => {
            setModels(await PieceCatalogApi().get());
        };

        fetchPieceCatalogs();
        
    }, []);

    return {
        model, 
        setModel,
        models,
        setModels
    };
}
