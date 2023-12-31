import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { delay, Observable, of } from 'rxjs';
import { EventInterface } from '../types/event.interface';

@Injectable()
export class EventsService {
  private runId = 10;

  get Id(): number {
    this.runId++;
    return this.runId;
}
  constructor(public http: HttpClient) { 
  }
 
  getEvents(): Observable<EventInterface[]> {
    return  this.http.get<any>('assets/sample.json');
  }
  

  editEvents(item: EventInterface): Observable<EventInterface> {
    //on real will be here http put
    return of(item).pipe(delay(100));
  }

  createEvents(item: EventInterface): Observable<EventInterface> {
    //on real will be here http post
    return of(item).pipe(delay(100));
  }
}
