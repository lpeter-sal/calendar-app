
export const NavBar = () => {
  return (
    <div className="nav-bar navbar bg-primary mb-4 px-4"> 
      <span className="navbar-brand">
        <i className="fas fa-calendar-alt"></i>
        &nbsp; Luis
      </span>

      <button className="btn btn-danger">
        <i className="fas fa-sign-out-alt"></i>
        <span>Logout</span>
      </button>
    </div>
  )
}
