const { render, screen, fireEvent } = require("@testing-library/react");
const { FabDelete } = require("../../../src/calendar/components/FabDelete");
const { useCalendarSotre } = require("../../../src/hooks/useCalendarSotre");


jest.mock('../../../src/hooks/useCalendarSotre');

describe('Pruebas en <FabDelete />', () => { 

    const mockStartDeletingEvent = jest.fn();

    beforeEach( () => jest.clearAllMocks() );

    test('Debe de mostrar el componente correctamente', () => { 
        useCalendarSotre.mockReturnValue({
            hasEventSelected: false
        });

        render( <FabDelete /> );

        const btn = screen.getByLabelText('btn-delete');
        expect( btn.classList ).toContain('btn');
        expect( btn.classList ).toContain('btn-danger');
        expect( btn.classList ).toContain('fab-danger');
        expect( btn.style.display ).toBe('none');
    });

    test('Debe de mostrar el boton si hay un evento activo', () => { 
        useCalendarSotre.mockReturnValue({
            hasEventSelected: true
        });

        render( <FabDelete /> );

        const btn = screen.getByLabelText('btn-delete');
        expect( btn.style.display ).toBe('');
    });

    test('Debe de llamar startDeletingEvent si hya evento activo', () => { 
        useCalendarSotre.mockReturnValue({
            hasEventSelected: true,
            startDeletingEvent: mockStartDeletingEvent
        });

        render( <FabDelete /> );
        
        const btn = screen.getByLabelText('btn-delete');
        fireEvent.click( btn );
        expect( mockStartDeletingEvent ).toHaveBeenCalled();
    });


});