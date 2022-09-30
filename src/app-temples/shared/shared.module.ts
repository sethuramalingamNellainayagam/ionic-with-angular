import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { GoogleMapsModule } from '@angular/google-maps';
import { IonicModule } from '@ionic/angular';
import { MapModalComponent } from './map-modal/map-modal.component';
import { ImagePickerComponent } from './pickers/image-picker/image-picker.component';
import { LocationPickerComponent } from './pickers/location-picker/location-picker.component';

@NgModule({
    imports: [IonicModule.forRoot(), CommonModule, GoogleMapsModule],
    declarations: [MapModalComponent, LocationPickerComponent, ImagePickerComponent],
    exports: [MapModalComponent, LocationPickerComponent, ImagePickerComponent],
    entryComponents: [MapModalComponent]
})
export class SharedModule {

}
