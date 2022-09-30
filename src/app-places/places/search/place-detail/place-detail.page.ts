import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {
  ActionSheetController,
  AlertController,
  LoadingController,
  ModalController,
  NavController,
} from '@ionic/angular';
import { Subscription } from 'rxjs';
import { switchMap, take } from 'rxjs/operators';
import { AuthService } from '../../../auth/auth.service';
import { BookingService } from '../../../bookings/booking.service';
import { CreateBookingComponent } from '../../../bookings/create-booking/create-booking.component';
import { MapModalComponent } from '../../../shared/map-modal/map-modal.component';
import { Place } from '../../place.model';
import { PlacesService } from '../../places.service';

@Component({
  selector: 'app-place-detail',
  templateUrl: './place-detail.page.html',
  styleUrls: ['./place-detail.page.scss'],
})
export class PlaceDetailPage implements OnInit, OnDestroy {
  getPlace: Place;
  isBookable = false;
  isLoading = false;
  private placeSub: Subscription;

  constructor(
    private activatedRoute: ActivatedRoute,
    private navCtrl: NavController,
    private placesService: PlacesService,
    private modalCtrl: ModalController,
    private actionSheetCtrl: ActionSheetController,
    private bookingService: BookingService,
    private router: Router,
    private loadingCtrl: LoadingController,
    private authService: AuthService,
    private alertCtrl: AlertController
  ) {}

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe((paramValue) => {
      if (!paramValue.has('placeId')) {
        this.navCtrl.navigateBack('/places');
        return;
      }
      this.isLoading = true;
      let fetchedUserId = '';
      this.authService.getUserId
        .pipe(
          take(1),
          switchMap((userId) => {
            if (!userId) {
              throw new Error('No Valid User found');
            }
            fetchedUserId = userId;
            return this.placesService.getPlaceValue(paramValue.get('placeId'));
          })
        )
        .subscribe(
          (place: Place) => {
            this.isLoading = false;
            this.getPlace = place;
            this.isBookable = place.userId !== fetchedUserId;
          },
          (error) => {
            this.alertCtrl
              .create({
                header: 'An Error occurred',
                message: 'Could not Load Place. Please try again!',
                buttons: [
                  {
                    text: 'Okay',
                    handler: () => {
                      this.router.navigateByUrl('/places/tabs/search');
                    },
                  },
                ],
              })
              .then((alertEl) => {
                alertEl.present();
              });
          }
        );
    });
  }

  onBookPlace(): void {
    this.actionSheetCtrl
      .create({
        header: 'Choose an action',
        buttons: [
          {
            text: 'Select Date',
            handler: () => {
              this.openBookingModal('select');
            },
          },
          {
            text: 'Random Date',
            handler: () => {
              this.openBookingModal('random');
            },
          },
          {
            text: 'Cancel',
            role: 'cancel',
          },
        ],
      })
      .then((actionSheetEl) => {
        actionSheetEl.present();
      });
  }

  openBookingModal(mode: 'select' | 'random') {
    this.modalCtrl
      .create({
        component: CreateBookingComponent,
        componentProps: { selectedPlace: this.getPlace, selectedMode: mode },
      })
      .then((modalEl) => {
        modalEl.present();
        return modalEl.onDidDismiss();
      })
      .then((modalData) => {
        const bookingData = modalData?.data?.bookingData;
        if (modalData.role === 'confirm') {
          this.loadingCtrl
            .create({
              message: 'Booking Place...',
            })
            .then((loadingEl) => {
              loadingEl.present();
              this.bookingService
                .addBooking(
                  this.getPlace.id,
                  this.getPlace.title,
                  this.getPlace.imageUrl,
                  bookingData?.firstName,
                  bookingData?.lastName,
                  bookingData?.numberOfGuests,
                  bookingData?.fromDate,
                  bookingData?.toDate
                )
                .subscribe(() => {
                  this.loadingCtrl.dismiss();
                  this.router.navigateByUrl('/places');
                });
            });
        }
      });
  }

  ngOnDestroy(): void {
    if (this.placeSub) {
      this.placeSub.unsubscribe();
    }
  }

  onImgClick() {
    this.modalCtrl
      .create({
        component: MapModalComponent,
        componentProps: {
          center: {
            lat: this.getPlace.location.lat,
            lng: this.getPlace.location.lng,
          },
          selectable: false,
          closeBtnText: 'Cancel',
          title: this.getPlace.location.address,
        },
      })
      .then((modalEl) => {
        modalEl.present();
      });
  }
}
