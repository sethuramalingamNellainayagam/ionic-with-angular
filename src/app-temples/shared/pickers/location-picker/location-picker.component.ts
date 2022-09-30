import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AlertController, ModalController } from '@ionic/angular';
import { MapModalComponent } from '../../map-modal/map-modal.component';
import { environment } from '../../../../environments/environment';
import { map, switchMap } from 'rxjs/operators';
import { Coordinates, PlaceLocation } from '../../../location.model';
import { of } from 'rxjs';
import { Capacitor } from '@capacitor/core';
import { Geolocation } from '@capacitor/geolocation';

@Component({
  selector: 'app-location-picker',
  templateUrl: './location-picker.component.html',
  styleUrls: ['./location-picker.component.scss'],
})
export class LocationPickerComponent implements OnInit {
  selectedImage = '';
  isLoading = false;
  @Output() locationPicked = new EventEmitter<PlaceLocation>();
  constructor(
    private modalCtrl: ModalController,
    private http: HttpClient,
    private alertCtrl: AlertController
  ) {}

  ngOnInit() {}

  onPickLocation() {
    this.modalCtrl.create({ component: MapModalComponent }).then((modalEl) => {
      modalEl.onDidDismiss().then((modalMap) => {
        if (!modalMap.data) {
          return;
        }
        this.isLoading = true;
        const getCoords: Coordinates = {
          lat: modalMap.data.lat,
          lng: modalMap.data.lng,
        };
        this.createPlaceFromCoords(getCoords.lat, getCoords.lng);
      });
      modalEl.present();
    });
  }

  private getAddress(lat: number, lng: number) {
    return this.http
      .get<any>(
        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${environment.googleMapsAPIKey}`
      )
      .pipe(
        map((geoData) => {
          if (!geoData || !geoData.results || geoData.results.length === 0) {
            return;
          }
          return geoData.results[0].formatted_address;
        })
      );
  }

  private fetchLocImage(lat: number, lng: number, zoom: number) {
    return `https://maps.googleapis.com/maps/api/staticmap?center=${lat},${lng}&zoom=14&size=500x300&key=${environment.googleMapsAPIKey}`;
  }

  onGetCurrentLocation() {
    if (!Geolocation) {
      this.showErrOnLocFetchDevice();
      return;
    }
    Geolocation.getCurrentPosition()
      .then((geoPosition) => {
        this.isLoading = true;
        const getCurrentLoc: Coordinates = {
          lat: geoPosition.coords.latitude,
          lng: geoPosition.coords.longitude,
        };
        this.createPlaceFromCoords(getCurrentLoc.lat, getCurrentLoc.lng);
      })
      .catch((err) => {
        this.showErrOnLocFetchDevice();
      });
  }

  private showErrOnLocFetchDevice() {
    this.alertCtrl
      .create({
        header: 'Could not fetch location',
        message: 'Please use the Pick location on the map',
        buttons: [
          {
            text: 'Pick a location from Map',
            handler: () => {
              this.onPickLocation();
            },
            role: 'button'
          },
        ],
      })
      .then((alertEl) => {
        alertEl.present();
      });
  }

  private createPlaceFromCoords(latitude: number, longitude: number) {
    const pickedLocation: PlaceLocation = {
      lat: latitude,
      lng: longitude,
      address: '',
      staticMapImgUrl: '',
    };
    this.getAddress(latitude, longitude)
      .pipe(
        switchMap((address) => {
          pickedLocation.address = address;
          return of(
            this.fetchLocImage(pickedLocation.lat, pickedLocation.lng, 14)
          );
        })
      )
      .subscribe((staticImgUrl) => {
        pickedLocation.staticMapImgUrl = staticImgUrl;
        this.selectedImage = staticImgUrl;
        this.isLoading = false;
        this.locationPicked.emit(pickedLocation);
      });
  }
}
