import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { select, Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { AppStateInterface } from 'src/app/types/app-state.interface';
import { MatDialog } from '@angular/material/dialog';
import * as EventsActions from '../../store/actions';
import { eventsSelector } from '../../store/selectors';
import { EventInterface } from '../../types/event.interface';

import { MatPaginator } from '@angular/material/paginator';
import { EventModalComponent } from '../../event-modal/event-modal.component';

@Component({
  selector: 'events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.scss'],
})
export class PostsComponent implements OnInit, OnDestroy {
  posts$: Observable<any>;
  displayedColumns: string[] = [
    'color',
    'name',
    'createDate',
    'lastUpdate',
    'createdBy',
  ];
  dataSource: MatTableDataSource<EventInterface>;
  public subscription = new Subscription();
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  emailFormControl = new FormControl('');
  constructor(
    public dialog: MatDialog,
    private store: Store<AppStateInterface>
  ) {}

  ngOnInit(): void {
    this.store.dispatch(EventsActions.getEvents());

    this.subscription.add(  this.store.pipe(select(eventsSelector)).subscribe((eventsStore) => {
      if (eventsStore.events.action) {
        this.dataSource = new MatTableDataSource(eventsStore.events.eventsData);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      }
    }));
  }

  openEditorModal(row?: EventInterface) {
    const dialogRef = this.dialog.open(EventModalComponent, {
      data: row,
    });
  }

  findByName() {
    if (this.emailFormControl.value) {
      this.dataSource.filter = this.emailFormControl.value
        .trim()
        .toLocaleLowerCase();
    } else {
      this.dataSource.filter = null;
    }
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
