import { Navigate, Route, Routes } from "react-router-dom"
import { AuthRoutes } from "../auth/router/AuthRoutes";
import { CalendarRouter } from "../calendar/router/CalendarRouter";


export const AppRouter = () => {

  const authStatus = 'not-authenticated'; //'not-authenticated'



  return (
    <Routes>
      
        {
          ( authStatus === 'authenticated')
          ? <Route path="/*" element={ <CalendarRouter /> } />
          : <Route path="/auth/*" element ={ <AuthRoutes /> } />
        }

        <Route path="/*" element={ <Navigate to="/auth/login" /> } />
        
    </Routes>
  )
}
