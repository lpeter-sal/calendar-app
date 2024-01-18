import { Navigate, Route, Routes } from "react-router-dom"
import { CalendarPage } from "../calendar";
import { AuthRoutes } from "../auth/router/AuthRoutes";


export const AppRouter = () => {

  const authStatus = 'not-authenticated';



  return (
    <Routes>
      
        {
          ( authStatus === 'not-authenticated')
          ? <Route path="/auth/*" element ={ <AuthRoutes /> } />
          : <Route path="/*" element={ <CalendarPage /> } />
        }

        <Route path="/*" element={ <Navigate to="/auth/login" /> } />
        
    </Routes>
  )
}
