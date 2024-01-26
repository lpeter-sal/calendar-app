import { useEffect, useState } from 'react';
import { Calendar } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';

import { CalendarEvent, CalendarModal, FabAddNew, FabDelete, NavBar } from "../"

import { localizer } from '../../helpers';
import { useAuthStore, useCalendarSotre, useUiStore } from '../../hooks';



export const CalendarPage = () => {

  const { user } = useAuthStore();
  const { openDateModal } = useUiStore();
  const { events, setActiveEvent, startLoadingEvents } = useCalendarSotre();

  const [lastView, setLastView] = useState(localStorage.getItem('lastView') || 'week' );

  const eventStyleGetter = ( event, start, end, isSelected ) => {

    const myEvent = ( user.uid === event.user._id ) || ( user.uid === event.user.uid );

    const style = {
      backgroundColor: myEvent ? '#347CF7' : '#465660',
      borderRadius: '0px',
      opacity: 0.8,
      color: '#fff'
    }
    return {
      style
    };
  }

  const onDoubleCkick = ( event ) => {
    openDateModal();
  }

  const onSelect = ( event ) => {
    // console.log({ click: event });
    setActiveEvent( event );
    
  }

  const onViewChanged = ( event ) => {
    localStorage.setItem('lastView', event);
    setLastView( event );
  }

  useEffect(() => {
    startLoadingEvents();

  }, []);
  

  return (
    <>
      <NavBar />
    
      <Calendar
        // culture='ES'
        localizer={ localizer }
        events={ events }
        defaultView={ lastView }
        startAccessor="start"
        endAccessor="end"
        style={{ height: 'calc( 100vh - 80px )', margin: '0 5px 0 5px'  }}
        // messages={ getMessagesES() }
        eventPropGetter={ eventStyleGetter }
        components={{
          event: CalendarEvent
        }}
        onDoubleClickEvent={ onDoubleCkick }
        onSelectEvent={ onSelect }
        onView={ onViewChanged }
      />
      
      <CalendarModal />
      <FabAddNew />
      <FabDelete />

    </>
  )
}
