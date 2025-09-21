import { useEffect, useState } from "react";
import MecanicApi from "../services/mecanic.api";
import { Mecanic, MecanicCreate, MecanicInitial } from "../types/mecanic.types";

export default function useMecanic() {
    const [models, setModels] = useState<Mecanic[]>([]);
    const [model, setModel] = useState<MecanicCreate>(MecanicInitial);

    useEffect( () => {
        const fetchMecanics = async () => {
            setModels(await MecanicApi().get());
        };

        fetchMecanics();
        
    }, []);

    return {
        model, 
        setModel,
        models,
        setModels
    };
}
