import { useEffect, useState } from "react";
import ServiceCatalogApi from "../services/service-catalog.api";
import { ServiceCatalog, ServiceCatalogCreate, ServiceCatalogInitial } from "../types/service-catalog.types";

export default function useServiceCatalog() {
    const [models, setModels] = useState<ServiceCatalog[]>([]);
    const [model, setModel] = useState<ServiceCatalogCreate>(ServiceCatalogInitial);

    useEffect( () => {
        const fetchServiceCatalogs = async () => {
            setModels(await ServiceCatalogApi().get());
        };

        fetchServiceCatalogs();
        
    }, []);

    return {
        model, 
        setModel,
        models,
        setModels
    };
}
