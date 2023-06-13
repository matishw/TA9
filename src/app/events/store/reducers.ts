import { createReducer, on } from '@ngrx/store';
import { EventsStateInterface } from '../types/event.state.interface';
import * as EventsActions from './actions';
import { ActionEnum } from '../types/action.enum';
import { publicDecrypt } from 'crypto';

export const initialState: EventsStateInterface = {
  isLoading: false,
  eventsData: [],
  error: null,
  action: undefined,
};

export const reducers = createReducer(
  initialState,
  on(EventsActions.getEventsSuccess, (state, action) => ({
    ...state,
    isLoading: false,
    eventsData: action.eventsData,
    action: ActionEnum.GET,
  })),
  on(EventsActions.EventsFailure, (state, action) => ({
    ...state,
    isLoading: false,
    error: action.error,
  })),
  on(EventsActions.editEventsSucess, (state, action) => ({
    ...state,
    eventsData: state.eventsData?.map((post) => {
      if (post.id === action.eventsData.id) {
        return action.eventsData;
      }
      return post;
    }),
    isLoading: false,
    action: ActionEnum.PUT,
  })),
  on(EventsActions.createEventsSucess, (state, action) => ({
    ...state,
    eventsData: [...state.eventsData, action.eventsData],
    isLoading: false,
    action: ActionEnum.POST,
  }))
);
