import { useState } from 'react';
import { Calendar } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';

import { CalendarEvent, CalendarModal, NavBar } from "../"

import { addHours } from 'date-fns';
import { localizer } from '../../helpers';



const events = [{
  title: 'Cumpleanos del Jefe',
  notes: 'Hay que comprar pastel',
  start: new Date(),
  end: addHours( new Date(), 2 ),
  bgColor: '#fafafa',
  user: {
    _id: '123',
    name: 'Luis'
  }
}]

export const CalendarPage = () => {

  const [lastView, setLastView] = useState(localStorage.getItem('lastView') || 'week' );

  const eventStyleGetter = ( event, start, end, isSelected ) => {
    const style = {
      backgroundColor: '#347CF7',
      borderRadius: '0px',
      opacity: 0.8,
      color: '#fff'
    }
    return {
      style
    };
  }

  const onDoubleCkick = ( event ) => {
    console.log({ doubleClick: event });

  }

  const onSelect = ( event ) => {
    console.log({ click: event });
    
  }

  const onViewChanged = ( event ) => {
    localStorage.setItem('lastView', event);
    setLastView( event );
  }

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

    </>
  )
}
