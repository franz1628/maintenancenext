import { useEffect, useState } from "react";
import ServiceApi from "../services/service.api";
import { Service, ServiceCreate, ServiceInitial } from "../types/service.types";

export default function useService() {
    const [models, setModels] = useState<Service[]>([]);
    const [model, setModel] = useState<ServiceCreate>(ServiceInitial);

    useEffect( () => {
        const fetchServices = async () => {
            setModels(await ServiceApi().get());
        };

        fetchServices();
        
    }, []);

    return {
        model, 
        setModel,
        models,
        setModels
    };
}
