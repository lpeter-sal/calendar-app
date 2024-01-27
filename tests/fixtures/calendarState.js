

export const events = [
    {
        idEvent: '1',
        start: new Date('2022-10-21 13:00:00'),
        end: new Date('2022-10-21 15:00:00'),
        title: 'Cumpleaños del Test User',
        notes: 'Nota de testing en el usuario Test User',
    },
    {
        idEvent: '2',
        start: new Date('2022-11-09 13:00:00'),
        end: new Date('2022-11-09 15:00:00'),
        title: 'Cumpleaños del Test User 2222',
        notes: 'Nota de testing en el usuario Test User 2222',
    }
]


export const initialState = {
    isLoading: true,
    events: [],
    activeEvent: null,
}


export const calendarWithEventsState = {
    isLoading: true,
    events: [ ...events ],
    activeEvent: null,
}

export const calendarWithActiveEventState = {
    isLoading: true,
    events: [ ...events ],
    activeEvent: { ...events[0] },
}