import { useEffect, useState } from "react";
import UserApi from "../services/user.api";
import { User, UserCreate, UserInitial } from "../types/user.types";

export default function useUser() {
    const [models, setModels] = useState<User[]>([]);
    const [model, setModel] = useState<UserCreate>(UserInitial);

    useEffect( () => {
        const fetchUsers = async () => {
            setModels(await UserApi().get());
        };

        fetchUsers();
        
    }, []);

    return {
        model, 
        setModel,
        models,
        setModels
    };
}
