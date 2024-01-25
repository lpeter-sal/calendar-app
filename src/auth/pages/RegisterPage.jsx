import Swal from 'sweetalert2';
import { useAuthStore, useForm } from '../../hooks';

import './AuthStyles.css';
import { useEffect } from 'react';

const registerFormFields = {
    registerName:       '',
    registerEmail:      '',
    registerPassword:   '',
    confirmPassword:    ''
  }

export const RegisterPage = () => {

    const { startRegister, errorMessage } = useAuthStore()
    const { registerName, registerEmail, registerPassword, confirmPassword, onInputChange } = useForm(registerFormFields);


    const registerSubmit = ( event ) => {

        event.preventDefault();
        if( registerPassword !== confirmPassword ){
            Swal.fire({
                title: 'Error en el registro',
                text: 'Las contraseñas deben ser iguales.',
                icon: 'error',
                showConfirmButton: false
            });
        }
        startRegister({ name: registerName, email: registerEmail, password: registerPassword });
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
                <form onSubmit={ registerSubmit }>
                    <h1>CALENDAR APP</h1>
                    <h3>REGISTER</h3>
                    <div className="input-box">
                        <input
                            type="text"
                            placeholder="Name"
                            name='registerName'
                            value={ registerName }
                            onChange={ onInputChange }
                        />
                        <i className='bx bxs-user'></i>
                    </div>
                    <div className="input-box">
                        <input
                            type="email"
                            placeholder="Email"
                            name='registerEmail'
                            value={ registerEmail }
                            onChange={ onInputChange }
                        />
                        <i className='bx bxs-envelope'></i>
                    </div>
                    <div className="input-box">
                        <input
                            type="password"
                            placeholder="Password"
                            name='registerPassword'
                            value={ registerPassword }
                            onChange={ onInputChange }
                        />
                        <i className='bx bxs-lock-alt' ></i>
                    </div>
                    <div className="input-box">
                        <input
                            type="password"
                            placeholder="Confirm password"
                            name='confirmPassword'
                            value={ confirmPassword }
                            onChange={ onInputChange }
                        />
                        <i className='bx bxs-lock-alt' ></i>
                    </div>


                    <input type="submit" className="btn" value="Create Account" />

                    <div className="register-link">
                        <p>Do you have an account?
                        <a href="/auth/login">
                        &nbsp; Login HERE!</a></p>
                    </div>
                </form>
            </div>
        </div>
    )
}



