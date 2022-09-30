import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, from, Observable } from 'rxjs';
import { delay, map, switchMap, take, tap } from 'rxjs/operators';
import { AuthService } from '../auth/auth.service';
import { Booking } from './booking.modal';

interface BookingDataJson {
  bookedFrom: string;
  bookedTo: string;
  firstName: string;
  lastName: string;
  numberOfGuests: number;
  placeId: string;
  placeImage: string;
  placeTitle: string;
  userId: string;
}
@Injectable({ providedIn: 'root' })
export class BookingService {
  private _bookings: BehaviorSubject<Booking[]> = new BehaviorSubject<
    Booking[]
  >([]);

  get getBookings(): Observable<Booking[]> {
    return this._bookings.asObservable();
  }

  constructor(
    private authService: AuthService,
    private httpClient: HttpClient
  ) {}

  addBooking(
    placeId: string,
    placeTitle: string,
    placeImage: string,
    firstName: string,
    lastName: string,
    numberOfGuests: number,
    fromDate: Date,
    toDate: Date
  ): Observable<Booking[]> {
    let generatedId = '';
    let newBooking: Booking;
    let fetchedUserId = '';
    return this.authService.getUserId.pipe(
      take(1),
      switchMap((userId) => {
        if (!userId) {
          throw new Error('No User id found!');
        }
        fetchedUserId = userId;
        return this.authService.getToken;
      }),
      take(1),
      switchMap((token) => {
        newBooking = new Booking(
          Math.random().toString(),
          placeId,
          fetchedUserId,
          placeTitle,
          placeImage,
          firstName,
          lastName,
          numberOfGuests,
          fromDate,
          toDate
        );
        return this.httpClient.post<{ name: string }>(
          `https://ionic-angular-places-2e534-default-rtdb.firebaseio.com/booked-places.json?auth=${token}`,
          {
            ...newBooking,
            id: null,
          }
        );
      }),
      switchMap((resData) => {
        generatedId = resData.name;
        return this._bookings;
      }),
      take(1),
      tap((latestBookings) => {
        newBooking.id = generatedId;
        this._bookings.next(latestBookings.concat(newBooking));
      })
    );
    // return this.getBookings.pipe(
    //   take(1),
    //   delay(1000),
    //   tap((latestBookings) => {
    //     this._bookings.next(latestBookings.concat(newBooking));
    //   })
    // );
  }

  cancelBooking(bookingId: string) {
    return this.authService.getToken.pipe(
      take(1),
      switchMap((token) => this.httpClient.delete(
          `https://ionic-angular-places-2e534-default-rtdb.firebaseio.com/booked-places.json/${bookingId}?auth=${token}`
        )),
      switchMap(() => this._bookings),
      take(1),
      tap((bookings) => {
        bookings.filter((booking) => booking.id !== bookingId);
      })
    );
  }

  fetchBookingsPerUser() {
    let fetchedUserId = '';
    return this.authService.getUserId.pipe(
      take(1),
      switchMap((userId) => {
        if (!userId) {
          throw new Error('No User found');
        }
        fetchedUserId = userId;
        return this.authService.getToken;
      }),
      take(1),
      switchMap((token) => this.httpClient.get<{ [key: string]: BookingDataJson }>(
          `https://ionic-angular-places-2e534-default-rtdb.firebaseio.com/booked-places.json?orderBy="userId"&equalTo="${fetchedUserId}?auth=${token}"`
        )),
      map((bookingData) => {
        const bookings = [];
        for (const key in bookingData) {
          if (bookingData.hasOwnProperty(key)) {
            bookings.push(
              new Booking(
                key,
                bookingData[key].placeId,
                fetchedUserId,
                bookingData[key].placeTitle,
                bookingData[key].placeImage,
                bookingData[key].firstName,
                bookingData[key].lastName,
                bookingData[key].numberOfGuests,
                new Date(bookingData[key].bookedFrom),
                new Date(bookingData[key].bookedTo)
              )
            );
          }
        }
        return bookings;
      }),
      tap((bookings) => {
        this._bookings.next(bookings);
      })
    );
  }
}
