import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";


export const Login = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();



    const handleSubmit = (e) => {
        e.preventDefault();

        if (!email || !password) {
            alert("Por favor complete todos los campos");
            return;
        }

        localStorage.setItem("logged", "true");
        navigate("/private");
    };


    return (
        <div className="container">

            <div className="card mt-5 bg-black bg-gradient w-75 mx-auto">
                <h1 className="mt-5 mb-5 text-light text-center">Iniciar Sesión</h1>

                <form className="row gy-3 mx-auto text-center">

                    <div className="col-6">
                        <div className="input-group">
                            <div className="input-group-text">@</div>
                            <input type="text" className="form-control" id="autoSizingInputGroup" placeholder="Correo electrónico" value={email} onChange={(e) => setEmail(e.target.value)} required></input>
                        </div>
                    </div>

                    <div className="col-6">
                        <input type="password" className="form-control" id="autoSizingInput" placeholder="Ingrese su contraseña" value={password} onChange={(e) => setPassword(e.target.value)} required></input>
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
                        <button type="submit" className="btn btn-lg btn-info " onClick={handleSubmit} >Enviar</button>
                    </div>
                    <p className="mt-3 link-light text-center">
                        ¿No tienes cuenta aún? <Link to="/signup" className="link-info">Regístrate aquí</Link>
                    </p>
                </form>
            </div>
        </div>
    )
}