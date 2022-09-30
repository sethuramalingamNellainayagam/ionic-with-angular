import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { Place } from './place.model';
import { map, switchMap, take, tap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { PlaceLocation } from './location.model';

interface PlaceJsonData {
  availableFrom: string;
  availableTo: string;
  description: string;
  imageUrl: string;
  price: number;
  title: string;
  location: PlaceLocation;
  userId: string;
}

@Injectable({
  providedIn: 'root',
})
// [
//   new Place(
//     'place1',
//     'Kashmir',
//     'Dal Lake',
//     'https://www.makemytrip.com/travel-guide/media/dg_image/srinagar/Dal-Lake.jpg',
//     50000,
//     new Date('2023-01-01'),
//     new Date('2023-12-31'),
//     'abc'
//   ),
//   new Place(
//     'place2',
//     'Gulmarg',
//     'Snow place',
//     'https://hblimg.mmtcdn.com/content/hubble/img/gulmarg/mmt/destination/m_Gulmarg_activity_mountains_l_460_690.jpg',
//     60000,
//     new Date('2023-01-01'),
//     new Date('2023-12-31'),
//     'user2'
//   ),
//   new Place(
//     'place3',
//     'Ellora Temple',
//     'A stone temple',
//     'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a5/Ellora_Cave_16_si0308.jpg/460px-Ellora_Cave_16_si0308.jpg',
//     10000,
//     new Date('2023-01-01'),
//     new Date('2023-12-31'),
//     'user3'
//   ),
// ]
export class PlacesService {
  private _placesInfo = new BehaviorSubject<Place[]>([]);

  get places() {
    return this._placesInfo.asObservable();
  }

  constructor(
    private authService: AuthService,
    private httpClient: HttpClient
  ) {}

  getPlaceValue(placeId: string) {
    return this.authService.getToken.pipe(
      take(1),
      switchMap((token) => this.httpClient.get<PlaceJsonData>(
          `https://ionic-angular-places-2e534-default-rtdb.firebaseio.com/offered-places/${placeId}.json?auth=${token}`
        )),
      map((placeData) => new Place(
          placeId,
          placeData.title,
          placeData.description,
          placeData.imageUrl,
          placeData.price,
          new Date(placeData.availableFrom),
          new Date(placeData.availableTo),
          placeData.location,
          placeData.userId
        ))
    );
    // return this.places.pipe(
    //   take(1),
    //   map((places: Place[]) => {
    //     return { ...places.find((place) => place.id === id) };
    //   })
    // );
  }

  fetchPlaces() {
    return this.authService.getToken.pipe(
      take(1),
      switchMap((token) => this.httpClient.get<{ [key: string]: PlaceJsonData }>(
          `https://ionic-angular-places-2e534-default-rtdb.firebaseio.com/offered-places.json?auth=${token}`
        )),
      map((resData) => {
        const places = [];
        for (const key in resData) {
          if (resData.hasOwnProperty(key)) {
            places.push(
              new Place(
                key,
                resData[key].title,
                resData[key].description,
                resData[key].imageUrl,
                resData[key].price,
                new Date(resData[key].availableFrom),
                new Date(resData[key].availableTo),
                resData[key].location,
                resData[key].userId
              )
            );
          }
        }
        return places;
      }),
      tap((places: Place[]) => {
        this._placesInfo.next(places);
      })
    );
  }

  uploadImage(image: File) {
    const uploadData = new FormData();
    uploadData.append('image', image);

    return this.authService.getToken.pipe(
      take(1),
      switchMap((token) => this.httpClient.post<{ imageUrl: string; imagePath: string }>(
          'https://us-central1-ionic-angular-places-2e534.cloudfunctions.net/storeImage',
          uploadData,
          { headers: { Authorization: 'Bearer ' + token } }
        ))
    );
  }

  addPlace(
    title: string,
    desc: string,
    price: number,
    fromDate: Date,
    toDate: Date,
    placeLoc: PlaceLocation,
    imageUrl: string
  ): Observable<any> {
    let generatedId = '';
    let newPlace: Place;
    let fetchedUserId = '';
    return this.authService.getUserId.pipe(
      take(1),
      switchMap((userId) => {
        fetchedUserId = userId;
        return this.authService.getToken;
      }),
      take(1),
      switchMap((token) => {
        if (!fetchedUserId) {
          throw new Error('No Valid user found');
        }
        newPlace = new Place(
          Math.random().toString(),
          title,
          desc,
          'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSDgU-uGLjc8B0BTeVO0NvI4qAqZNp2qCU7gg&usqp=CAU',
          price,
          fromDate,
          toDate,
          placeLoc,
          fetchedUserId
        );
        return this.httpClient.post<{ name: string }>(
          `https://ionic-angular-places-2e534-default-rtdb.firebaseio.com/offered-places.json?auth=${token}`,
          { ...newPlace, id: null }
        );
      }),
      switchMap((resData) => {
        generatedId = resData.name;
        return this.places;
      }),
      take(1),
      tap((latestPlaces) => {
        latestPlaces.id = generatedId;
        this._placesInfo.next(latestPlaces.concat(newPlace));
      })
    );
    // return this.places.pipe(
    //   take(1),
    //   delay(1000),
    //   tap((latestPlaces) => {
    //     this._placesInfo.next(latestPlaces.concat(newPlace));
    //   })
    // );
  }

  updatePlace(placeId: string, title: string, desc: string) {
    let updatedPlaces: Place[] = [];
    let fetchedToken = '';
    return this.authService.getToken.pipe(
      switchMap((token) => {
        fetchedToken = token;
        return this.places;
      }),
      take(1),
      switchMap((places) => {
        if (!places || places.length <= 0) {
          return this.fetchPlaces();
        } else {
          return of(places);
        }
      }),
      switchMap((places) => {
        const updPlaceIndex = places.findIndex((p1) => p1.id === placeId);
        updatedPlaces = [...places];
        const oldPlace = updatedPlaces[updPlaceIndex];
        updatedPlaces[updPlaceIndex] = new Place(
          oldPlace.id,
          title,
          desc,
          oldPlace.imageUrl,
          oldPlace.price,
          oldPlace.availableFrom,
          oldPlace.availableTo,
          oldPlace.location,
          oldPlace.userId
        );
        return this.httpClient.put(
          `https://ionic-angular-places-2e534-default-rtdb.firebaseio.com/offered-places/${placeId}.json?auth=${fetchedToken}`,
          { ...updatedPlaces[updPlaceIndex], id: null }
        );
      }),
      tap(() => {
        this._placesInfo.next(updatedPlaces);
      })
    );
  }
}
