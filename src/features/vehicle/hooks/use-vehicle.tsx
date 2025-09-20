import { useEffect, useState } from "react";
import VehicleApi from "../services/vehicle.api";
import { Vehicle, VehicleCreate, VehicleInitial } from "../types/vehicle.types";

export default function useVehicle() {
    const [models, setModels] = useState<Vehicle[]>([]);
    const [model, setModel] = useState<VehicleCreate>(VehicleInitial);

    useEffect( () => {
        const fetchVehicles = async () => {
            setModels(await VehicleApi().get());
        };

        fetchVehicles();
        
    }, []);

    return {
        model, 
        setModel,
        models,
        setModels
    };
}
