import { useDispatch, useSelector } from "react-redux"
import { calendarApi } from "../api";
import { clearErrorMessage, onChecking, onLogin, onLogout } from "../store";


export const useAuthStore = () => {

    const { status, user, errorMessage } = useSelector( state => state.auth );
    const dispatch = useDispatch();

    const startLogin = async({ email, password }) => {
        dispatch( onChecking() );
        try {
            
            const { data } = await calendarApi.post('/auth', { email, password } );
            localStorage.setItem('token', data.token );
            localStorage.setItem('token-init-date', new Date().getTime() );
            dispatch( onLogin({ name: data.name, uid: data.uid }) );

        } catch (error) {
            dispatch( onLogout('Credenciales Incorrectas') );
            setTimeout( () => {
                dispatch( clearErrorMessage() );
            }, 10 );
        }
    }

    const startRegister = async({ name, email, password }) => {
        dispatch( onChecking() );
        try {
            const { data } = await calendarApi.post('/auth/new', { email, password, name } );
            localStorage.setItem('token', data.token );
            localStorage.setItem('token-init-date', new Date().getTime() );
            dispatch( onLogin({ name: data.name, uid: data.uid }) );

        } catch (error) {
            console.log(error);
            dispatch( onLogout(error.response.data?.errorMessage || '--') );
            setTimeout( () => {
                dispatch( clearErrorMessage() );
            }, 10 );
        }

    }




    return {
        // Properties
        errorMessage,
        status,
        user,

        // Methods
        startLogin,
        startRegister
    }
}