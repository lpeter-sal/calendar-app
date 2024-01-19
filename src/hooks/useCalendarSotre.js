import { useDispatch, useSelector } from "react-redux"
import { onAddNewEvent, onDeleteEvent, onSetActiveEvent, onUpdateEvent } from "../store/calendar/calendarSlice";

export const useCalendarSotre = () => {

    const dispatch = useDispatch();
    const { events, activeEvent } = useSelector( state => state.calendar );

    const setActiveEvent = ( calendarEvent ) => {
        dispatch( onSetActiveEvent( calendarEvent ) );
    }
  
    const startSavingEvent = async( calendarEvent ) => {
        


        if( calendarEvent._id ) {
            //Update

            dispatch( onUpdateEvent({...calendarEvent}) );
        } else {
            //Create
            dispatch( onAddNewEvent({ ...calendarEvent, _id: new Date().getTime() }) );
        }
    }
    
    const startDeletingEvent = () => {



        dispatch( onDeleteEvent() );
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
    }
    
}
