import { useState } from "react";
import { login } from "../services/auth.api";
import Swal from "sweetalert2";

export default function useAuth() {
    const [user, setUser] = useState<string | null>(null);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);

    const postLogin = async (email: string, password: string) => {
        setLoading(true);
        setSuccess(false);

        const data = await login({ email, password });
        setLoading(false);
        if (data?.data.access_token) {
            setUser(data.data.access_token);
            setSuccess(true);
            return true;
        }

        return false;

    };

    return { user, email, setEmail, password, setPassword, postLogin, loading, success };
}
