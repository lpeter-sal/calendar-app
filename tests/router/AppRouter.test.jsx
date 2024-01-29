import { render, screen } from "@testing-library/react";
import { useAuthStore } from "../../src/hooks/useAuthStore";
import { AppRouter } from "../../src/router/AppRouter";
import { MemoryRouter } from "react-router-dom";

jest.mock('../../src/hooks/useAuthStore');

jest.mock('../../src/calendar/router/CalendarRouter', () => ({
    CalendarRouter: () => <h1>CalendarRoute</h1>
}));



describe('Pruebas en <AppRouter />', () => { 

    const mockCheckAuthToken = jest.fn();

    beforeEach( () => jest.clearAllMocks() );


    test('Debe de mostrar la pantalla de carga y llamar AuthCheckToken', () => { 

        useAuthStore.mockReturnValue({
            status: 'checking',
            checkAuthToken: mockCheckAuthToken
        });
        
        render( <AppRouter /> )
        
        expect(screen.getByText('Cargando...')).toBeTruthy();
        expect(mockCheckAuthToken).toHaveBeenCalled();
    });

    test('Debe de mostrar el login en caso de no estar autenticado', () => { 

        useAuthStore.mockReturnValue({
            status: 'not-authenticated',
            checkAuthToken: mockCheckAuthToken
        });
        
        const { container } = render( 
            <MemoryRouter initialEntries={ ['/auth/algo/otracosa'] }>
                <AppRouter />
            </MemoryRouter> 
        );

        expect(screen.getByText('LOGIN')).toBeTruthy();
        expect( container ).toMatchSnapshot();
    });

    test('Debe de mostrar el calendario si estamos autenticados', () => { 

        useAuthStore.mockReturnValue({
            status: 'authenticated',
            checkAuthToken: mockCheckAuthToken
        });
        
       render( 
            <MemoryRouter>
                <AppRouter />
            </MemoryRouter> 
        );

        expect( screen.getByText('CalendarRoute')).toBeTruthy();
    });
    


});