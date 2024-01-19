
import './AuthStyles.css';


export const RegisterPage = () => {
    return (
        <div className="cont-body">
            <div className="wrapper">
                <form action="">
                    <h1>CALENDAR APP</h1>
                    <h3>REGISTER</h3>
                    <div className="input-box">
                        <input
                            type="text"
                            placeholder="Name"
                        />
                        <i className='bx bxs-user'></i>
                    </div>
                    <div className="input-box">
                        <input
                            type="email"
                            placeholder="Email"
                        />
                        <i className='bx bxs-envelope'></i>
                    </div>
                    <div className="input-box">
                        <input
                            type="password"
                            placeholder="Password"
                        />
                        <i className='bx bxs-lock-alt' ></i>
                    </div>
                    <div className="input-box">
                        <input
                            type="password"
                            placeholder="Confirm password"
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



