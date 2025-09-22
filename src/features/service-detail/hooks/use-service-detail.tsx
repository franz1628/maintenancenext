import { useEffect, useState } from "react";
import ServiceDetailApi from "../services/service-detail.api";
import { ServiceDetail, ServiceDetailCreate, ServiceDetailInitial } from "../types/service-detail.types";

export default function useServiceDetail() {
    const [models, setModels] = useState<ServiceDetail[]>([]);
    const [model, setModel] = useState<ServiceDetailCreate>(ServiceDetailInitial);

    useEffect( () => {
        const fetchServiceDetails = async () => {
            setModels(await ServiceDetailApi().get());
        };

        fetchServiceDetails();
        
    }, []);

    return {
        model, 
        setModel,
        models,
        setModels
    };
}
