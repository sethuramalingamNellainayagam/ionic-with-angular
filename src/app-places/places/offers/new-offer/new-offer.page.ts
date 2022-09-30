import {
  Component,
  OnChanges,
  OnInit,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import {
  FormControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { switchMap } from 'rxjs/operators';
import { PlaceLocation } from '../../location.model';
import { PlacesService } from '../../places.service';

function base64toBlob(base64Data, contentType) {
  contentType = contentType || '';
  const sliceSize = 1024;
  const byteCharacters = atob(base64Data);
  const bytesLength = byteCharacters.length;
  const slicesCount = Math.ceil(bytesLength / sliceSize);
  const byteArrays = new Array(slicesCount);

  for (let sliceIndex = 0; sliceIndex < slicesCount; ++sliceIndex) {
    const begin = sliceIndex * sliceSize;
    const end = Math.min(begin + sliceSize, bytesLength);

    const bytes = new Array(end - begin);
    for (let offset = begin, i = 0; offset < end; ++i, ++offset) {
      bytes[i] = byteCharacters[offset].charCodeAt(0);
    }
    byteArrays[sliceIndex] = new Uint8Array(bytes);
  }
  return new Blob(byteArrays, { type: contentType });
}
@Component({
  selector: 'app-new-offer',
  templateUrl: './new-offer.page.html',
  styleUrls: ['./new-offer.page.scss'],
})
export class NewOfferPage implements OnInit {
  newOfferForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private placesService: PlacesService,
    private router: Router,
    private loadingCtrl: LoadingController
  ) {}

  ngOnInit() {
    this.newOfferForm = this.fb.group({
      title: new FormControl(null, {
        updateOn: 'change',
        validators: [Validators.required],
      }),
      desc: new FormControl(null, {
        updateOn: 'change',
        validators: [Validators.required, Validators.maxLength(180)],
      }),
      price: new FormControl(null, {
        updateOn: 'change',
        validators: [Validators.required, Validators.min(1)],
      }),
      fromDate: new FormControl(null, {
        updateOn: 'change',
        validators: [Validators.required],
      }),
      toDate: new FormControl(null, {
        updateOn: 'change',
        validators: [Validators.required],
      }),
      location: new FormControl(null, {
        updateOn: 'change',
        validators: [Validators.required],
      }),
      image: new FormControl(null, {
        updateOn: 'change',
      }),
    });
  }

  submitNewOffer(): void {
    if (!this.newOfferForm.valid) {
      return;
    }
    this.loadingCtrl
      .create({
        message: 'Adding new Offer...',
      })
      .then((loaderEl) => {
        loaderEl.present();
        this.placesService
          .addPlace(
            this.newOfferForm.controls.title?.value,
            this.newOfferForm.controls.desc?.value,
            +this.newOfferForm.controls.price?.value,
            new Date(this.newOfferForm.controls.fromDate?.value),
            new Date(this.newOfferForm.controls.toDate?.value),
            this.newOfferForm.controls.location?.value,
            ''
          )
          .subscribe(() => {
            this.loadingCtrl.dismiss();
            this.newOfferForm.reset();
            this.router.navigateByUrl('/places/tabs/offers');
          });
      });
  }

  onLocPicked(pickedLocation: PlaceLocation) {
    this.newOfferForm.patchValue({
      location: pickedLocation,
    });
  }

  onImagePicked(pickedImage: string | File) {
    let imageFile;
    if (typeof pickedImage === 'string') {
      try {
        //imageFile = base64toBlob(pickedImage.replace('data:image/jpeg;base64,',''), 'image/jpeg');
        imageFile = pickedImage;
      } catch (error) {
        console.log(error);
        return;
      }
    } else {
      imageFile = pickedImage;
    }
    this.newOfferForm.patchValue({
      image: imageFile,
    });
  }
}
