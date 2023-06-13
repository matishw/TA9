import { createAction, props } from '@ngrx/store';
import { EventInterface } from '../types/event.interface';

export const getEvents = createAction('[Events] Get Events');
export const editEvents = createAction('[Events] Edit Events', props<{ event: EventInterface }>());
export const createEvents = createAction('[Events] Create Events', props<{ event: EventInterface }>());


export const getEventsSuccess = createAction(
  '[Events] Get Events success',
  props<{ eventsData: EventInterface[] }>()
);

export const editEventsSucess = createAction(
  '[Events] Edit Events success',
  props<{ eventsData: EventInterface}>()
);

export const createEventsSucess = createAction(
  '[Events] Create Events success',
  props<{ eventsData: EventInterface}>()
);

export const EventsFailure = createAction(
  '[Events] Events failure',
  props<{ error: string }>()
);
