import { calendarSlice, onAddNewEvent, onDeleteEvent, onLoadEvents, onLogoutCalendar, onSetActiveEvent, onUpdateEvent } from "../../../src/store/calendar/calendarSlice";
import { calendarWithActiveEventState, calendarWithEventsState, events, initialState } from "../../fixtures/calendarState";


describe('Pruebas en calendarSlice', () => { 
    
    test('Debe de regresar el estado por defecto', () => { 

        const state = calendarSlice.getInitialState();

        expect( state ).toEqual( initialState );
    }); 

    test('onSetActiveEvent debe activar el evento', () => { 

    const state = calendarSlice.reducer( calendarWithEventsState, onSetActiveEvent( events[0]) );

    expect( state.activeEvent ).toEqual( events[0] );
    }); 

    test('onAddNewEvent debe agregar un evento', () => { 

        const newEvent = {
            idEvent: '3',
            start: new Date('2021-11-09 13:00:00'),
            end: new Date('2021-11-09 15:00:00'),
            title: 'Cumpleaños del Test User 3333',
            notes: 'Nota de testing en el usuario Test User 3333',
        }
        const state = calendarSlice.reducer( calendarWithEventsState, onAddNewEvent( newEvent ) );
        expect( state.events ).toEqual([ ...events, newEvent ]);
    }); 

    test('onUpdateEvent debe actualizar el evento', () => { 

        const updateEvent = {
            idEvent: '1',
            start: new Date('2021-11-09 13:00:00'),
            end: new Date('2021-11-09 15:00:00'),
            title: 'Cumpleaños del Test User Actualizado',
            notes: 'Nota de testing en el usuario Test User Actualizado',
        }
        const state = calendarSlice.reducer( calendarWithEventsState, onUpdateEvent( updateEvent ) );
        expect( state.events ).toContain( updateEvent );
    }); 

    test('onDeleteEvent debe elimnar el evento activo', () => { 

        const state = calendarSlice.reducer( calendarWithActiveEventState, onDeleteEvent() );
        
        expect( state.activeEvent ).toBe( null );
        expect( state.events ).not.toContain( events[0] );
    }); 

    test('onLoadEvents debe establecer los eventos', () => { 

        const state = calendarSlice.reducer( initialState,  onLoadEvents( events ) );
        expect( state.isLoading ).toBeFalsy();
        expect( state.events ).toEqual( events );

        const newState = calendarSlice.reducer( state,  onLoadEvents( events ) );
        expect( newState.events.length ).toBe( events.length );
    }); 

    test('onLogoutCalednar debe limpiar el estado', () => { 

        const state = calendarSlice.reducer( calendarWithActiveEventState, onLogoutCalendar() );
        expect( state ).toEqual( initialState );
    }); 


});