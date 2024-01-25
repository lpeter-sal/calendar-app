
import { useEffect } from 'react';
import { useAuthStore, useForm } from '../../hooks';
import './AuthStyles.css';
import Swal from 'sweetalert2';

const loginFormFields = {
  loginEmail:    '',
  loginPassword: ''
}

export const LoginPage = () => {

  const { startLogin, errorMessage } = useAuthStore();

  const { loginEmail, loginPassword, onInputChange } = useForm(loginFormFields);

  const loginSubmit = ( event ) => {

    event.preventDefault();
    startLogin({ email: loginEmail, password: loginPassword })
    
  }

  useEffect(() => {
    if( errorMessage !== undefined) {
      Swal.fire({
        title: 'Error en la autenticacion',
        text: errorMessage,
        icon: 'error',
        showConfirmButton: false
    });
    }
  }, [errorMessage]);
  

  return (
    <div className="cont-body">
      <div className="wrapper">
        <form onSubmit={ loginSubmit }>
          <h1>CALENDAR APP</h1>
          <h3>LOGIN</h3>
          <div className="input-box">
            <input
              type="text"
              placeholder="Email"
              name='loginEmail'
              value={ loginEmail }
              onChange={ onInputChange }
            />
            <i className='bx bxs-envelope'></i>
          </div>
          <div className="input-box">
            <input
              type="password"
              placeholder="Password"
              name='loginPassword'
              value={ loginPassword }
              onChange={ onInputChange }
            />
            <i className='bx bxs-lock-alt' ></i>
          </div>


          <input type="submit" className="btn" value="Login" />

          <div className="register-link">
              <p>Don't have an account?
              <a href="/auth/register">
              &nbsp; Register HERE!</a></p>
          </div>
        </form>
      </div>
    </div>
  )
}