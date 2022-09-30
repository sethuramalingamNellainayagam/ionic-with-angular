import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import {
  AlertController,
  LoadingController,
  NavController,
} from '@ionic/angular';
import { Subscription } from 'rxjs';
import { Place } from '../../place.model';
import { PlacesService } from '../../places.service';

@Component({
  selector: 'app-edit-offer',
  templateUrl: './edit-offer.page.html',
  styleUrls: ['./edit-offer.page.scss'],
})
export class EditOfferPage implements OnInit, OnDestroy {
  getPlace: Place;
  editOfferForm: FormGroup;
  isLoading = false;
  private placeSub: Subscription;

  constructor(
    private activateRoute: ActivatedRoute,
    private navCtrl: NavController,
    private placesService: PlacesService,
    private formBuilder: FormBuilder,
    private router: Router,
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController
  ) {}

  ngOnInit() {
    this.activateRoute.paramMap.subscribe((paramValue) => {
      if (!paramValue.has('placeId')) {
        this.navCtrl.navigateBack('/places/tabs/offers');
        return;
      }
      this.isLoading = true;
      this.placeSub = this.placesService
        .getPlaceValue(paramValue.get('placeId'))
        .subscribe(
          (place: Place) => {
            this.getPlace = place;
            this.editOfferForm = this.formBuilder.group({
              title: new FormControl(this.getPlace.title, {
                updateOn: 'blur',
                validators: [Validators.required],
              }),
              desc: new FormControl(this.getPlace.description, {
                updateOn: 'blur',
                validators: [Validators.required],
              }),
            });
            this.isLoading = false;
          },
          (error) => {
            this.alertCtrl
              .create({
                header: 'An Error occurred',
                message: 'Place detail failed to load. Please try again!',
                buttons: [
                  {
                    text: 'Okay',
                    handler: () => {
                      this.router.navigateByUrl('/places/tabs/offers');
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

  editOffer(): void {
    if (!this.editOfferForm.valid) {
      return;
    }
    this.loadingCtrl
      .create({
        message: 'Editing Offer...',
      })
      .then((loadingEl) => {
        loadingEl.present();
        this.placesService
          .updatePlace(
            this.getPlace.id,
            this.editOfferForm.value.title,
            this.editOfferForm.value.desc
          )
          .subscribe(() => {
            loadingEl.dismiss();
            this.editOfferForm.reset();
            this.router.navigateByUrl('/places/tabs/offers');
          });
      });
  }

  ngOnDestroy(): void {
    if (this.placeSub) {
      this.placeSub.unsubscribe();
    }
  }
}
