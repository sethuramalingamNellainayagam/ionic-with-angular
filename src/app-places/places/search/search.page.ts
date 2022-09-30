import { Component, OnDestroy, OnInit } from '@angular/core';
import { SegmentChangeEventDetail } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { take } from 'rxjs/operators';
import { AuthService } from 'src/app-places/auth/auth.service';
import { Place } from '../place.model';
import { PlacesService } from '../places.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.page.html',
  styleUrls: ['./search.page.scss'],
})
export class SearchPage implements OnInit, OnDestroy {
  loadedPlaces: Place[] = [];
  listedLoadedPlace: Place[] = [];
  relevantPlaces: Place[] = [];
  isLoading = false;
  private placesSub: Subscription;

  constructor(
    private placesService: PlacesService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.placesSub = this.placesService.places.subscribe((places: Place[]) => {
      this.loadedPlaces = places;
      this.relevantPlaces = this.loadedPlaces;
      this.listedLoadedPlace = this.loadedPlaces.slice(1);
    });
  }

  ionViewWillEnter() {
    this.isLoading = true;
    this.placesService.fetchPlaces().subscribe(() => {
      this.isLoading = false;
    });
  }

  onFilterPlaces(event: Event): void {
    this.authService.getUserId.pipe(take(1)).subscribe((userId) => {
      if (
        (event as CustomEvent<SegmentChangeEventDetail>).detail.value === 'all'
      ) {
        this.relevantPlaces = this.loadedPlaces;
        this.listedLoadedPlace = this.loadedPlaces.slice(1);
      } else {
        this.relevantPlaces = this.loadedPlaces.filter((place) => {
          userId !== place.userId;
        });
        this.listedLoadedPlace = this.loadedPlaces.slice(1);
      }
    });
  }

  ngOnDestroy(): void {
    if (this.placesSub) {
      this.placesSub.unsubscribe();
    }
  }
}
