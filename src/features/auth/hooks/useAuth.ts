import { useState } from "react";
import { login } from "../services/auth.api";
import Swal from "sweetalert2";
import { useMutation } from "@tanstack/react-query";

export default function useAuth() {
    const [user, setUser] = useState<string | null>(null);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const postLogin = useMutation({
        mutationFn: () => login({ email, password }),
        onSuccess: (data) => {
            localStorage.setItem("token", data.data.access_token);
        },
        onError: (error: any) => {
            Swal.fire({
                title: "Login Failed",
                text: error.message,
                icon: "error",
            });
        },
    });

    return { user, email, setEmail, password, setPassword, postLogin };
}
