import { Link as RouterLink } from "react-router-dom";
import { Link } from "@mui/material";

import './AuthStyles.css';


export const LoginPage = () => {
  return (
    <div className="wrapper">
      <form action="">
        <h1>CALENDAR APP</h1>
        <h3>LOGIN</h3>
        <div className="input-box">
          <input
            type="text"
            placeholder="Correo"
          />
          <i className='bx bxs-envelope'></i>
        </div>
        <div className="input-box">
          <input
            type="password"
            placeholder="Contraseña"
          />
          <i className='bx bxs-lock-alt' ></i>
        </div>


        <input type="submit" className="btn" value="Login" />

        <div className="register-link">
            <p>No tienes cuenta?
            <Link component={RouterLink} color='inherit' to='/auth/register'>
            &nbsp; Registrarse</Link></p>
        </div>
      </form>
    </div>
  )
}