import { useState } from "react";

export default function useAuth() {
    const [user, setUser] = useState<string | null>(null);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const login = (email: string, password: string) => {
        // Mock login function
        if (email === "user@example.com" && password === "password") {
            setUser(email);
        } else {
            alert("Invalid credentials");
        }
    };  
    return { user, email, setEmail, password, setPassword, login };
}
