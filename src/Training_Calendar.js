import React from 'react'
import FullCalendar, { formatDate } from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import { INITIAL_EVENTS, createEventId } from './event-utils'
import { INITIAL_TRAININGS } from './Trainings'
import moment from 'moment';

export default class Training_Calendar extends React.Component {

  state = {
    weekendsVisible: true,
    initialEvents: [],

  }

  componentDidMount() {


    fetch("https://customerrest.herokuapp.com/gettrainings")
    .then((response) => response.json())
    .then((responseData) => {
      console.log(responseData);

      this.setState({
        initialEvents: responseData.filter(i => (i.customer !== null)).map(x => {
          return {
            id: x.id,
            title: x.activity + ' (' + x.customer.firstname + ' ' + x.customer.lastname + ')',
            start: moment(x.date).format("YYYY-MM-DD hh:mm"),
            end: moment(x.date).add(x.duration, 'minutes').format("YYYY-MM-DD hh:mm")
          };
        })
      })

      console.log(this.state.initialEvents)

     
    })
    .catch((error) => console.log(error));

 

    
    
    
}

  handleWeekendsToggle = () => {
    this.setState({
      weekendsVisible: !this.state.weekendsVisible
    })
  }


  render() {
   
  
    return (
      <div className='demo-app'>
        {this.renderSidebar()}
        <div className='demo-app-main'>
          <FullCalendar
            plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
            headerToolbar={{
              left: 'prev,next today',
              center: 'title',
              right: 'dayGridMonth,timeGridWeek,timeGridDay'
            }}
            initialView='dayGridMonth'
            //editable={true}
            selectable={true}
            selectMirror={true}
            dayMaxEvents={true}
            weekends={this.state.weekendsVisible}
            //initialEvents={this.state.initalDates} // alternatively, use the `events` setting to fetch from a feed
            //select={this.handleDateSelect}
            events={this.state.initialEvents}
            eventContent={renderEventContent} // custom render function
            //eventClick={this.handleEventClick}
            eventsSet={this.handleEvents} // called after events are initialized/added/changed/removed
            /* you can update a remote database when these fire:
            eventAdd={function(){}}
            eventChange={function(){}}
            eventRemove={function(){}}
            */
          />
        </div>
      </div>
    )
  }

  renderSidebar() {
    return (
      <div className='demo-app-sidebar'>

        <div className='demo-app-sidebar-section'>
      <br />
        </div>
      </div>
    )
  }

  handleWeekendsToggle = () => {
    this.setState({
      weekendsVisible: !this.state.weekendsVisible
    })
  }

  handleDateSelect = (selectInfo) => {
    let title = prompt('Please enter a new title for your event')
    let calendarApi = selectInfo.view.calendar

    calendarApi.unselect() // clear date selection

    if (title) {
      calendarApi.addEvent({
        id: createEventId(),
        title,
        start: selectInfo.startStr,
        end: selectInfo.endStr,
        allDay: selectInfo.allDay
      })
    }
  }

  handleEventClick = (clickInfo) => {
    if (window.confirm(`Are you sure you want to delete the event '${clickInfo.event.title}'`)) {
      clickInfo.event.remove()
    }
  }

  handleEvents = (events) => {
    this.setState({
      currentEvents: events
    })
  }

}

function renderEventContent(eventInfo) {
  return (
    <>
      <b>{eventInfo.timeText}</b>
      <i>{eventInfo.event.title}</i>
    </>
  )
}

function renderSidebarEvent(event) {
  return (
    <li key={event.id}>
      <b>{formatDate(event.start, {year: 'numeric', month: 'short', day: 'numeric'})}</b>
      <i>{event.title}</i>
    </li>
  )
}
