import React, { useEffect, useState } from 'react';
import { Navbar } from '../ui/Navbar';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import { messages } from '../../helpers/calendar-messages';
import { CalendarEvent } from './CalendarEvent';
import moment from 'moment';
import 'moment/locale/es'
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { CalendarModal } from './CalendarModal';
import { useDispatch, useSelector } from 'react-redux';
import { uiOpenModal } from '../../actions/ui';
import { eventSetActive, eventStartLoading } from '../../actions/events';
import { AddNewFab } from '../ui/AddNewFab';
import { DeleteEventFab } from '../ui/DeleteEventFab';


moment.locale('es');
const localizer = momentLocalizer(moment);

export const CalendarScreen = ( ) => {
  const [ lastView, setLastView ] = useState( localStorage.getItem('lastView') || 'month' );
  const { events, activeEvent } = useSelector(state => state.calendar)
  const { uid } = useSelector(state => state.auth)
  const dispatch = useDispatch();
  //console.log(events)

  useEffect(() => {

    dispatch( eventStartLoading() )
   
  }, [ dispatch ])

  const onDoubleClick = (e) => {
    
    dispatch( eventSetActive(e) );
    dispatch( uiOpenModal() );
    
  }
  
  const onSelectEvent = (e) => {
   dispatch( eventSetActive(e) );
  }

  const onViewChange = (e) => {
    setLastView(e)
    localStorage.setItem('lastView', e)
  }

  const onSelectSlot = (e) => {
    dispatch( eventSetActive(null) )
  }

  const eventStyleGetter = ( event, start, end, isSelected) => {

    const style = {
      backgroundColor: ( uid === event.user._id ) ? '#367CF7' : '#465660' ,
      borderRadius: '0px',
      opacity: 0.8,
      display: 'block',
      color: 'white'
    }

    return {
      style
    }
  }


  return (
    <div className='calendar-screen'>
      <Navbar />
      <Calendar
        localizer={ localizer }
        events={ events }
        startAccessor="start"
        endAccessor="end"
        messages={ messages }
        eventPropGetter={ eventStyleGetter }
        components={{
          event: CalendarEvent
        }}
        onDoubleClickEvent={ onDoubleClick }
        onSelectEvent={ onSelectEvent }
        onView={ onViewChange }
        view={ lastView }
        selectable={ true }
        onSelectSlot={ onSelectSlot }
      />

      <CalendarModal />

      <AddNewFab />

      {
        activeEvent &&
        <DeleteEventFab />
      }
    </div>
  )
}
