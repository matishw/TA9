import { EventInterface } from './event.interface';

export interface EventsStateInterface {
  isLoading: boolean;
  eventsData: EventInterface[];
  action?:string
  error: string | null;
}
