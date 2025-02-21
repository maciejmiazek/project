import { useState, useEffect } from "react";
import { Navigate, Outlet } from "react-router-dom";
import axios from "axios";

const ProtectedRoutes = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(null); // Początkowo null (ładowanie)

    useEffect(() => {
        const checkAuth = async () => {
            try {
                const response = await axios.post('/api/auth', {});
                if (response.status === 200) {
                    setIsAuthenticated(true);
                } else {
                    setIsAuthenticated(false);
                }
            } catch (error) {
                setIsAuthenticated(false);
            }
        };

        checkAuth();
    }, []);

    if (isAuthenticated === null) {
        return <p>Ładowanie...</p>; // Można dodać spinner
    }

    return isAuthenticated ? <Outlet /> : <Navigate to="/" />;
};

export default ProtectedRoutes;