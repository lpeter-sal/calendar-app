
import './AuthStyles.css';


export const LoginPage = () => {
  return (
    <div className="cont-body">
      <div className="wrapper">
        <form action="">
          <h1>CALENDAR APP</h1>
          <h3>LOGIN</h3>
          <div className="input-box">
            <input
              type="text"
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