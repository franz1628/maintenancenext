import { useState } from "react";
import { login } from "../services/auth.api";
import Swal from "sweetalert2";

export default function useAuth() {
    const [user, setUser] = useState<string | null>(null);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const postLogin = async (email: string, password: string) => {
        const data = await login({ email, password });

        Swal.fire({
            title: "Login Successful",
            text: `Welcome, ${data.data.user.name}!`,
            icon: "success",
        });
    };

    return { user, email, setEmail, password, setPassword, postLogin };
}
