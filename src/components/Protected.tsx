import { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router";

const Protected = () => {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

    useEffect(() => {
        fetch("http://localhost:3000/check-auth", {
            method: "GET",
            credentials: "include",
        }).then((res) => {
            if (res.status === 200) {
                setIsAuthenticated(true);
            } else {
                setIsAuthenticated(false);
            }
        }).catch(() => setIsAuthenticated(false));
    }, []);

    if (isAuthenticated === null) return <p>Loading...</p>;

    return isAuthenticated ? <Outlet /> : <Navigate to="/login" />
}

export default Protected;