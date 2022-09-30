import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { Place } from 'src/app-places/places/place.model';

@Component({
  selector: 'app-create-booking',
  templateUrl: './create-booking.component.html',
  styleUrls: ['./create-booking.component.scss'],
})
export class CreateBookingComponent implements OnInit {
  @Input() selectedPlace: Place;
  @Input() selectedMode: 'select' | 'random';
  startDate: string;
  toDate: string;
  @ViewChild('createForm', { static: true }) createFormRef: NgForm;

  constructor(private modalCtrl: ModalController) {}

  ngOnInit() {
    const availableFrom = new Date(this.selectedPlace.availableFrom);
    const availableTo = new Date(this.selectedPlace.availableTo);
    if (this.selectedMode === 'random') {
      this.startDate = new Date(
        availableFrom.getTime() +
          Math.random() *
            (availableTo.getTime() -
              7 * 24 * 60 * 60 * 1000 -
              availableTo.getTime())
      ).toISOString();

      this.toDate = new Date(
        new Date(this.startDate).getTime() +
          Math.random() * new Date(this.startDate).getTime() +
          6 * 24 * 60 * 60 * 1000 -
          new Date(this.startDate).getTime()
      ).toISOString();
    }
  }

  onCancel(): void {
    this.modalCtrl.dismiss(null, 'cancel');
  }

  onCreateBook(): void {
    if (!this.createFormRef.valid || this.datesValid()) {
      return;
    }
    this.modalCtrl.dismiss(
      {
        bookingData: {
          firstName: this.createFormRef.controls['first-name']?.value,
          lastName: this.createFormRef.controls['last-name']?.value,
          numberOfGuests: +this.createFormRef.controls['guest-number']?.value,
          startDate: new Date(this.createFormRef.controls.fromDate?.value),
          enDate: new Date(this.createFormRef.controls.toDate?.value),
        },
      },
      'confirm'
    );
  }

  datesValid(): boolean {
    const fromDateValue = new Date(
      this.createFormRef.controls.fromDate?.value
    );
    const toDateValue = new Date(this.createFormRef.controls.toDate?.value);
    return toDateValue > fromDateValue;
  }
}
