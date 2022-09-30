import {
  Component,
  ElementRef,
  Input,
  OnInit,
  Renderer2,
  ViewChild,
} from '@angular/core';
import { ModalController } from '@ionic/angular';

import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-map-modal',
  templateUrl: './map-modal.component.html',
  styleUrls: ['./map-modal.component.scss'],
})
export class MapModalComponent implements OnInit {
  @ViewChild('map', { static: true }) mapElRef: ElementRef;
  @Input() center: google.maps.LatLngLiteral = {
    lat: 12.95114543625359,
    lng: 80.23694478826384,
  };
  @Input() selectable = true;
  @Input() closeBtnText = 'Cancel';
  @Input() title = 'Pick a Location!';
  constructor(
    private modalCtrl: ModalController,
    private renderer: Renderer2
  ) {}

  ngOnInit() {}

  onCancel(): void {
    this.modalCtrl.dismiss();
  }

  onMapClick(event) {
    const selectedCoordinates = event.latLng.toJSON();
    this.modalCtrl.dismiss(selectedCoordinates);
  }

  // ngAfterViewInit(): void {
  //   this.loadGoogleMaps()
  //     .then((googleMapsSdk) => {
  //       const mapEl = this.mapElRef.nativeElement;
  //       const getMap = new googleMapsSdk.Map(mapEl, {
  //         center: { lat: 12.95114543625359, lng: 80.23694478826384 },
  //         zoom: 16,
  //       });
  //       googleMapsSdk.event.addListenerOnce(getMap, 'idle', () => {
  //         this.renderer.addClass(mapEl, 'visible');
  //       });

  //       getMap.addListenr("click", (event) => {
  //         const selectedCoordinates = {
  //           latitude: event.latLng.lat(),
  //           longitude: event.latLng.lng(),
  //         };
  //         this.modalCtrl.dismiss(selectedCoordinates);
  //       });
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  // }

  private loadGoogleMaps(): Promise<any> {
    const windowValue = window as any;
    const googleModule = windowValue.google;
    if (googleModule && googleModule.maps) {
      return Promise.resolve(googleModule.maps);
    }
    return new Promise((resolve, reject) => {
      const scriptEl = document.createElement('script');
      scriptEl.src = `https://maps.googleapis.com/maps/api/js?key=${environment.googleMapsAPIKey}&callback=initMap`;
      scriptEl.async = true;
      scriptEl.defer = true;
      document.body.appendChild(scriptEl);
      scriptEl.onload = () => {
        const loadedGoogleModule = windowValue.google;
        if (loadedGoogleModule && loadedGoogleModule.maps) {
          resolve(loadedGoogleModule.maps);
        } else {
          reject('Google maps SDK not loaded!');
        }
      };
    });
  }
}
