import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap, of } from 'rxjs';
import { EventsService } from '../services/events.service';
import * as EventsActions from './actions';

@Injectable()
export class EventsEffects {
  getPosts$ = createEffect(() =>
    this.actions$.pipe(
      ofType(EventsActions.getEvents),
      mergeMap(() => {
        return this.eventsService.getEvents().pipe(
          map((events) =>
            EventsActions.getEventsSuccess({ eventsData: events })
          ),
          catchError((error) =>
            of(EventsActions.getEventsFailure({ error: error.message }))
          )
        );
      })
    )
  );

  createEvents$ = createEffect(() =>
    this.actions$.pipe(
      ofType(EventsActions.createEvents),
      mergeMap((item) => {
        return this.eventsService.createEvents(item.event).pipe(
          map((post) => EventsActions.createEventsSucess({ eventsData: post })),
          catchError((error) =>
            of(EventsActions.getEventsFailure({ error: error.message }))
          )
        );
      })
    )
  );

  editEvents$ = createEffect(() =>
    this.actions$.pipe(
      ofType(EventsActions.editEvents),
      mergeMap((item) => {
        return this.eventsService.editEvents(item.event).pipe(
          map((post) => EventsActions.editEventsSucess({ eventsData: post })),
          catchError((error) =>
            of(EventsActions.getEventsFailure({ error: error.message }))
          )
        );
      })
    )
  );

  constructor(private actions$: Actions, private eventsService: EventsService) {}
}
