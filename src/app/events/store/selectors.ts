import { createSelector } from '@ngrx/store';
import { AppStateInterface } from 'src/app/types/app-state.interface';

export const selectFeature = (state: AppStateInterface) => state;
export const eventsSelector = createSelector(
  selectFeature,
  (state) => state
);

