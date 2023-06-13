import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AppStateInterface } from 'src/app/types/app-state.interface';
import { EventsService } from '../services/events.service';
import { ColorEnum } from '../types/color.enum';

import * as EventsActions from './../store/actions';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { EventInterface } from '../types/event.interface';

@Component({
  selector: 'app-event-modal',
  templateUrl: './event-modal.component.html',
  styleUrls: ['./event-modal.component.scss'],
})
export class EventModalComponent implements OnInit {
  colors: ColorOptionInterfcae[] = [
    { value: ColorEnum.Brown, viewValue: ColorEnum.Brown },
    { value: ColorEnum.Green, viewValue: ColorEnum.Green },
    { value: ColorEnum.Orange, viewValue: ColorEnum.Orange },
    { value: ColorEnum.Pink, viewValue: ColorEnum.Pink },
    { value: ColorEnum.Red, viewValue: ColorEnum.Red },
    { value: ColorEnum.Yellow, viewValue: ColorEnum.Yellow },
  ];
  public eventForm: FormGroup;
  constructor(
    private store: Store<AppStateInterface>,
    private eventsService: EventsService,
    public dialogRef: MatDialogRef<EventModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: EventInterface
  ) {}
  ngOnInit(): void {
    this.eventForm = new FormGroup({
      color: new FormControl(this.data?.color, [Validators.required]),
      name: new FormControl(this.data?.name, [Validators.required]),
      createdBy: new FormControl(this.data?.createdBy, [Validators.required]),
    });
  }

  onSubmit() {
    let event: EventInterface  = {
      color: this.eventForm.get('color')?.value,
      name: this.eventForm.get('name')?.value,
      createdBy: this.eventForm.get('createdBy')?.value,
    };
    if (this.data?.id) {
      this.store.dispatch(
        EventsActions.editEvents({
          event: {
            ...event,
            id: this.data.id,
            createDate: this.data.createDate,
            lastUpdate: this.data.lastUpdate,
          },
        })
      );
    } else {
      this.store.dispatch(
        EventsActions.createEvents({
          event: {
            ...event,
            id:  this.eventsService.Id,
            createDate: new Date(),
            lastUpdate: new Date(),
          },
        })
      );
    }
  }
}

interface ColorOptionInterfcae {
  value: string;
  viewValue: string;
}
