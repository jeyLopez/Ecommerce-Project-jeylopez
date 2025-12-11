import React from "react";
import { useNavigate } from "react-router-dom";


export const Private = () => {
    //de simulación
    const isLogged = localStorage.getItem("logged") === "true";

    const navigate = useNavigate();

    const Name = localStorage.getItem("Name");

    if (!isLogged) {
        navigate("/login");
    }

    return (
        <div className="container text-center mt-5 w-100">
            <div className="card bg-dark text-light p-5">
                <h1 className="mb-4">¡Qué bueno verte de vuelta {Name}!</h1>

            </div>
        </div>
    );
}
