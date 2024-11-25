import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-calender',
  templateUrl: './calender.component.html',
  styleUrl: './calender.component.scss'
})
export class CalenderComponent {
  selectedDate: Date | null = null;
  isEventFormVisible = false;
  isEditMode = false;
  events: { name: string; startDate: Date; endDate: Date }[] = [];
  eventsForSelectedDate: { name: string; startDate: Date; endDate: Date }[] = [];
  eventForm!: FormGroup;
  editEventIndex: number | null = null;

  constructor(private fb: FormBuilder) {
    this.eventForm = this.fb.group({
      eventName: ['', Validators.required],
      startDate: [null, Validators.required],
      endDate: [null, Validators.required],
    });
  }

  ngOnInit() {
    this.refreshEventsForSelectedDate();
  }

  onDateSelected(date: Date | null) {
    if (date) {
      this.selectedDate = date;
      this.refreshEventsForSelectedDate();
    } else {
      this.selectedDate = null;
      this.eventsForSelectedDate = [];
    }
  }

  refreshEventsForSelectedDate() {
    if (this.selectedDate) {
      this.eventsForSelectedDate = this.events.filter(
        (event) =>
          this.isDateInRange(this.selectedDate!, event.startDate, event.endDate)
      );
    } else {
      this.eventsForSelectedDate = [];
    }
  }

  isDateInRange(date: Date, start: Date, end: Date): boolean {
    return (
      date >= new Date(start.setHours(0, 0, 0, 0)) &&
      date <= new Date(end.setHours(23, 59, 59, 999))
    );
  }

  openEventForm() {
    this.isEventFormVisible = true;
    this.isEditMode = false;
    this.eventForm.reset();
  }

  closeEventForm() {
    this.isEventFormVisible = false;
    this.eventForm.reset();
  }

  saveEvent() {
    if (this.eventForm.valid) {
      const event = this.eventForm.value;
      if (this.isEditMode && this.editEventIndex !== null) {
        this.events[this.editEventIndex] = event; // Update event
      } else {
        this.events.push(event); // Add new event
      }
      this.refreshEventsForSelectedDate();
      this.closeEventForm();
    }
  }

  editEvent(event: any) {
    this.isEditMode = true;
    this.editEventIndex = this.events.indexOf(event);
    this.eventForm.patchValue(event);
    this.isEventFormVisible = true;
  }

  deleteEvent(event: any) {
    this.events = this.events.filter((e) => e !== event);
    this.refreshEventsForSelectedDate();
  }

  dateClass = (date: Date) => {
    return this.events.some((event) =>
      this.isDateInRange(date, event.startDate, event.endDate)
    )
      ? 'highlight-date'
      : '';
  };
}
