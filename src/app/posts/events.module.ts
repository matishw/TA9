import { CommonModule, NgIf } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { PostsComponent } from './components/events/events.component';
import { EventsService } from './services/events.service';
import { EventsEffects } from './store/effects';
import { reducers } from './store/reducers';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatPaginatorModule } from '@angular/material/paginator';
import { EventModalComponent } from './event-modal/event-modal.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import {MatIconModule} from '@angular/material/icon';

@NgModule({
  imports: [
    CommonModule,
    StoreModule.forFeature('events', reducers),
    EffectsModule.forFeature([EventsEffects]),
    MatSlideToggleModule,
    MatTableModule,
    MatSortModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatPaginatorModule,
    MatDialogModule,
    MatButtonModule,
    MatSelectModule,
    MatIconModule
  ],
  providers: [EventsService],
  declarations: [PostsComponent, EventModalComponent],
  exports: [PostsComponent],
})
export class EventsModule {}
