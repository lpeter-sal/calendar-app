import { useDispatch, useSelector } from "react-redux"
import { onAddNewEvent, onDeleteEvent, onLoadEvents, onSetActiveEvent, onUpdateEvent } from "../store/calendar/calendarSlice";
import { calendarApi } from "../api";
import { convertEventsToDateEvents } from "../helpers";
import Swal from "sweetalert2";

export const useCalendarSotre = () => {

    const dispatch = useDispatch();
    const { events, activeEvent } = useSelector( state => state.calendar );
    const { user } = useSelector( state => state.auth );

    const setActiveEvent = ( calendarEvent ) => {
        dispatch( onSetActiveEvent( calendarEvent ) );
    }
  
    const startSavingEvent = async( calendarEvent ) => {

        try {
            if( calendarEvent.idEvent ) {
                //Update
                await calendarApi.put(`/events/${ calendarEvent.idEvent }`, calendarEvent );
                dispatch( onUpdateEvent({...calendarEvent, user }) );
                return;
            }
    
            //Create
            const { data } = await calendarApi.post('/events', calendarEvent );
            dispatch( onAddNewEvent({ ...calendarEvent, id: data.saveEvent.idEvent, user }) );
        } catch (error) {
            Swal.fire({
                title: 'Error al actualizar',
                text: error.response.data.errorMessage,
                icon: 'error',
                showConfirmButton: false
            });
        }
        
    }
    
    const startDeletingEvent = async() => {
        try {
            await calendarApi.delete(`/events/${ activeEvent.idEvent }`);
            dispatch( onDeleteEvent() );
        } catch (error) {
            Swal.fire({
                title: 'Error al eliminar',
                text: error.response.data.errorMessage,
                icon: 'error',
                showConfirmButton: false
            });
            
        }


    }

    const startLoadingEvents = async() => {

        try {

            const { data } = await calendarApi.get('/events');
            const events = convertEventsToDateEvents( data.events );
            dispatch( onLoadEvents( events ) );
            
        } catch (error) {
            console.log('Error al cargar los eventos')
            console.log(error);
        }
    }
  
  
    return {
            // Properties
            activeEvent,
            events,
            hasEventSelected: !!activeEvent,

            // Methods
            setActiveEvent,
            startDeletingEvent,
            startSavingEvent,
            startLoadingEvents,
    }
    
}
