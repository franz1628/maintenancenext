import { apiFetch } from "@/config/api";
import { useEffect, useState } from "react";
import BrandApi from "../services/brand.api";
import { Brand, BrandCreate, BrandInitial } from "../types/brand.types";

export default function useBrand() {
    const [models, setModels] = useState<Brand[]>([]);
    const [model, setModel] = useState<BrandCreate>(BrandInitial);

    useEffect( () => {
        const fetchBrands = async () => {
            setModels(await BrandApi().get());
        };

        fetchBrands();
        
    }, []);


    return {
        model, 
        setModel,
        models,
        setModels
    };
}
