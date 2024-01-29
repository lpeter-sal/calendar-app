import { act, renderHook, waitFor } from "@testing-library/react";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import { authSlice } from "../../src/store";
import { useAuthStore } from "../../src/hooks/useAuthStore";
import { notAuthenticatedState, initialState } from "../fixtures/authStates";
import { testUserCredentials } from "../fixtures/testUser";


const getMockStore = ( initialState ) => {
    return configureStore({
        reducer: {
            auth: authSlice.reducer

        },
        preloadedState: {
            auth: { ...initialState }
        }


    });
}


describe('Pruebas en useAuthStore', () => { 

    test('Debe de regresar el estado por defecto', () => { 
        
        const mockStore = getMockStore( { ...initialState } );
        const { result } = renderHook( () => useAuthStore(), {
            wrapper: ({ children }) => <Provider store={ mockStore }> { children } </Provider>
        });
        
        expect(result.current).toEqual({
            errorMessage: undefined,
            status: 'checking',
            user: {},
            startLogin: expect.any(Function),
            startRegister: expect.any(Function),
            checkAuthToken: expect.any(Function),
            startLogout: expect.any(Function),
        }); 
    });

    test('startLogin Debe de realizar el login correctamente', async() => {
        localStorage.clear(); 
        
        const mockStore = getMockStore( { ...notAuthenticatedState } );
        const { result } = renderHook( () => useAuthStore(), {
            wrapper: ({ children }) => <Provider store={ mockStore }> { children } </Provider>
        });

        await act( async() => {
            await result.current.startLogin(testUserCredentials);
        });

        const { errorMessage, status, user } = result.current;

        expect({ errorMessage, status, user }).toEqual({
            errorMessage: undefined,
            status: 'authenticated',
            user: { name: 'Test User', uid: '65b522353df8782caddb2cb4' }
        });

        expect( localStorage.getItem('token') ).toEqual( expect.any(String) );
        expect( localStorage.getItem('token-init-date') ).toEqual( expect.any(String) );
    });

    test('startLogin Debe de fallar la autentificacion', async() => {
        
        localStorage.clear(); 
        const mockStore = getMockStore( { ...notAuthenticatedState } );
        const { result } = renderHook( () => useAuthStore(), {
            wrapper: ({ children }) => <Provider store={ mockStore }> { children } </Provider>
        });

        await act( async() => {
            await result.current.startLogin({email: 'loquese@sea.com', password: '213246'});
        });

        const { errorMessage, status, user } = result.current;

        expect(localStorage.getItem('token')).toBe(null);
        expect({ errorMessage, status, user }).toEqual({
            errorMessage: expect.any(String),
            status: 'not-authenticated',
            user: {}
        });

        await waitFor( 
            () => expect( result.current.errorMessage ).toBeUndefined()
        )
    });

});