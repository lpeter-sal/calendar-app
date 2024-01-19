import { Navigate, Route, Routes } from "react-router-dom"
import { AuthRoutes } from "../auth/router/AuthRoutes";
import { CalendarRouter } from "../calendar/router/CalendarRouter";


export const AppRouter = () => {

  const authStatus = 'no-authenticated'; //'not-authenticated'



  return (
    <Routes>
      
        {
          ( authStatus === 'not-authenticated')
          ? <Route path="/auth/*" element ={ <AuthRoutes /> } />
          : <Route path="/*" element={ <CalendarRouter /> } />
        }

        <Route path="/*" element={ <Navigate to="/auth/login" /> } />
        
    </Routes>
  )
}
