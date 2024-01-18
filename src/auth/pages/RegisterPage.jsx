import { Link as RouterLink } from "react-router-dom";
import { Link } from "@mui/material";

import './LoginPage.css';


export const RegisterPage = () => {
    return (
        <div className="wrapper">
            <form action="">
                <h1>Registro</h1>
                <div className="input-box">
                    <input
                        type="text"
                        placeholder="Nombre"
                    />
                    <i className='bx bxs-user'></i>
                </div>
                <div className="input-box">
                    <input
                        type="email"
                        placeholder="Correo"
                    />
                    <i class='bx bxs-envelope'></i>
                </div>
                <div className="input-box">
                    <input
                        type="password"
                        placeholder="Contraseña"
                    />
                    <i className='bx bxs-lock-alt' ></i>
                </div>
                <div className="input-box">
                    <input
                        type="password"
                        placeholder="Repetir su contraseña"
                    />
                    <i className='bx bxs-lock-alt' ></i>
                </div>


                <input type="submit" className="btn" value="Crear Cuenta" />

                <div className="register-link">
                    <p>Ya tienes cuenta?
                    <Link component={RouterLink} color='inherit' to='/auth/login'>
                    &nbsp; Ingresar</Link></p>
                </div>
            </form>
        </div>
    )
}



