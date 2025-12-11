import React, { useState } from "react"
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export const Signup = () => {

    const [Name, setName] = useState("");
    const [LastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const navigate = useNavigate();


    const handleRegistro = (e) => {
        e.preventDefault();

        if (!Name || !LastName || !email || !password || !confirmPassword) {
            alert("Por favor complete todos los campos");
            return;
        }

        if (password !== confirmPassword) {
            alert("Las contraseñas no coinciden");
            return;
        }

        localStorage.setItem("Name", Name);
        navigate("/login");
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
