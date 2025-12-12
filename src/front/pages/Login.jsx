import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer"

export const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { dispatch } = useGlobalReducer();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!email || !password) {
            alert("Por favor complete todos los campos");
            return;
        }

        try {
            const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/auth/login`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password }),
            });

            if (!res.ok) {
                alert("Credenciales inválidas");
                return;
            }

            const data = await res.json();
            const token = data.datos.access_token;
            const user = data.datos.user;

            // Actualizar store
            dispatch({
                type: "LOGIN_SUCCESS",
                payload: { token, user },
            });

            navigate("/private");
        } catch (error) {
            console.error(error);
            alert("Error en el servidor");
        }
    };

    return (
        <div className="container">

            <div className="card mt-5 bg-black bg-gradient w-75 mx-auto">
                <h1 className="mt-5 mb-5 text-light text-center">Registrarse</h1>

                <form className="row gy-3 mx-auto text-center">
                    <div className="col-4">
                        <input type="text" className="form-control" id="autoSizingInputName" placeholder="Nombre" value={Name} onChange={(e) => setName(e.target.value)} required></input>
                    </div>
                    <div className="col-4">
                        <input type="text" className="form-control" id="autoSizingInputLastname" placeholder="Apellido" value={LastName} onChange={(e) => setLastName(e.target.value)} required></input>
                    </div>
                    <div className="col-4">
                        <div className="input-group">
                            <div className="input-group-text">@</div>
                            <input type="text" className="form-control" id="autoSizingInputGroupEmail" placeholder="Correo electrónico" value={email} onChange={(e) => setEmail(e.target.value)} required></input>
                        </div>
                    </div>

                    <div className="col-6">
                        <input type="password" className="form-control" id="autoSizingInputPassword" placeholder="Ingrese su contraseña" value={password} onChange={(e) => setPassword(e.target.value)} required></input>
                    </div>
                    <div className="col-6">
                        <input type="password" className="form-control" id="autoSizingInputConfirmPassword" placeholder="Confirme contraseña" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required></input>
                    </div>

                    <div className="col-auto">
                        <div className="form-check">
                            <input className="form-check-input" type="checkbox" id="autoSizingCheck"></input>
                            <label htmlFor="autoSizingCheck" className="form-check-label text-light">
                                Recuédame
                            </label >
                        </div>
                    </div>
                    <div className=" text-center">
                        <button type="submit" className="btn btn-lg btn-info" onClick={handleRegistro}>Registrarme</button>
                    </div>
                    <p className="mt-3 text-light">
                        ¿Ya tienes cuenta? <Link to="/login" className="link-info">Inicia sesión</Link>
                    </p>
                </form>
            </div>
        </div>
    )
}