import { useEffect, useState } from "react";
import ServiceDetailCatalogApi from "../services/service-detail-catalog.api";
import { ServiceDetailCatalog, ServiceDetailCatalogCreate, ServiceDetailCatalogInitial } from "../types/service-detail-catalog.types";

export default function useServiceDetailCatalog() {
    const [models, setModels] = useState<ServiceDetailCatalog[]>([]);
    const [model, setModel] = useState<ServiceDetailCatalogCreate>(ServiceDetailCatalogInitial);

    useEffect( () => {
        const fetchServiceDetailCatalogs = async () => {
            setModels(await ServiceDetailCatalogApi().get());
        };

        fetchServiceDetailCatalogs();
        
    }, []);

    return {
        model, 
        setModel,
        models,
        setModels
    };
}
