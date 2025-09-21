import { useEffect, useState } from "react";
import SellerApi from "../services/seller.api";
import { Seller, SellerCreate, SellerInitial } from "../types/seller.types";

export default function useSeller() {
    const [models, setModels] = useState<Seller[]>([]);
    const [model, setModel] = useState<SellerCreate>(SellerInitial);

    useEffect( () => {
        const fetchSellers = async () => {
            setModels(await SellerApi().get());
        };

        fetchSellers();
        
    }, []);

    return {
        model, 
        setModel,
        models,
        setModels
    };
}
