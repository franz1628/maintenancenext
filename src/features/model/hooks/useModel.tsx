import { useEffect, useState } from "react";
import ModelApi from "../services/model.api";
import { Model, ModelCreate, ModelInitial } from "../types/model.types";

export default function useModel() {
    const [models, setModels] = useState<Model[]>([]);
    const [model, setModel] = useState<ModelCreate>(ModelInitial);

    useEffect( () => {
        const fetchModels = async () => {
            setModels(await ModelApi().get());
        };

        fetchModels();
        
    }, []);

    return {
        model, 
        setModel,
        models,
        setModels
    };
}
