import { Navigate, Route, Routes } from "react-router-dom"
import { AuthRoutes } from "../auth/router/AuthRoutes";
import { CalendarRouter } from "../calendar/router/CalendarRouter";
import { useAuthStore } from "../hooks";
import { useEffect } from "react";


export const AppRouter = () => {

  const { status, checkAuthToken } = useAuthStore();
  // const authStatus = 'not-authenticated'; //'not-authenticated'

  useEffect(() => {
    checkAuthToken();

  }, []);
  

  if( status === 'checking' ){
    return (
      <h3>Cargando...</h3>
    )
  }

  return (
    <Routes>
      
        {
          ( status === 'not-authenticated')
          ? (
              <>
                <Route path="/auth/*" element ={ <AuthRoutes /> } />
                <Route path="/*" element={ <Navigate to="/auth/login" /> } />
              </>
          )
          : (
              <>
                <Route path="/" element={ <CalendarRouter /> } />
                <Route path="/*" element={ <Navigate to="/" /> } />
              </>
          )
          
        }

        
    </Routes>
  )
}
