import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { Temple } from './temple.model';
import { map, switchMap, take, tap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class TemplesService {
  private _templesInfo = new BehaviorSubject<Temple[]>([]);

  get temples() {
    return this._templesInfo.asObservable();
  }

  constructor(
    private authService: AuthService,
    private httpClient: HttpClient
  ) {}

  getTempleValue(templeNo: number) {
    return this.httpClient
      .get<Temple>(
        `https://ionic-angular-places-2e534-default-rtdb.firebaseio.com/offered-places/${templeNo}.json`
      )
      .pipe(
        map((templeData) => new Temple(
            templeNo,
            templeData.title,
            templeData.description,
            templeData.imageUrl,
            templeData.place,
            templeData.district,
            templeData.state,
            templeData.legend,
            templeData.userId
          ))
      );
  }

  fetchTemples() {
    return this.httpClient
      .get<{ [key: string]: Temple }>(
        'https://ionic-temples-default-rtdb.firebaseio.com/sivan-temples-276.json'
      )
      .pipe(
        map((resData) => {
          const temples = [];
          for (const key in resData) {
            if (resData.hasOwnProperty(key)) {
              temples.push(
                new Temple(
                  resData[key].templeNo,
                  resData[key].title,
                  resData[key].description,
                  resData[key].imageUrl,
                  resData[key].place,
                  resData[key].district,
                  resData[key].state,
                  resData[key].legend,
                  resData[key].userId,
                  resData[key].youtubeLink,
                  resData[key].wikiLink,
                )
              );
            }
          }
          return temples;
        }),
        tap((temples: Temple[]) => {
          console.log(temples, ' temples');
          this._templesInfo.next(temples);
        })
      );
  }

  addTemple(
    templeNo: number,
    title: string,
    description: string,
    imageUrl: string,
    place: string,
    district: string,
    state: string,
    legend: string,
    userId: string,
    youtubeLink: string,
    wikiLink: string,
  ): Observable<any> {
    let generatedId = '';
    const newPlace = new Temple(
      templeNo,
      title,
      description,
      imageUrl,
      place,
      district,
      state,
      legend,
      userId,
      youtubeLink,
      wikiLink
    );
    return this.httpClient
      .post<{ name: string }>(
        'https://ionic-temples-default-rtdb.firebaseio.com/sivan-temples-276.json',
        { ...newPlace, id: null }
      )
      .pipe(
        switchMap((resData) => {
          generatedId = resData.name;
          return this.temples;
        }),
        take(1),
        tap((latestTemples) => {
          latestTemples.id = generatedId;
          this._templesInfo.next(latestTemples.concat(newPlace));
        })
      );
  }

  updateTemple(templeNo: number, title: string, desc: string) {
    let updatedTemples: Temple[] = [];
    return this.temples.pipe(
      take(1),
      switchMap((temples) => {
        if (!temples || temples.length <= 0) {
          return this.fetchTemples();
        } else {
          return of(temples);
        }
      }),
      switchMap((tenples) => {
        const updTempleIndex = tenples.findIndex((p1) => p1.templeNo === templeNo);
        updatedTemples = [...tenples];
        const oldTemple = updatedTemples[updTempleIndex];
        updatedTemples[updTempleIndex] = new Temple(
          oldTemple.templeNo,
          title,
          desc,
          oldTemple.imageUrl,
          oldTemple.place,
          oldTemple.district,
          oldTemple.state,
          oldTemple.legend,
          oldTemple.userId
        );
        return this.httpClient.put(
          `https://ionic-angular-places-2e534-default-rtdb.firebaseio.com/offered-places/${templeNo}.json`,
          { ...updatedTemples[updTempleIndex], id: null }
        );
      }),
      tap(() => {
        this._templesInfo.next(updatedTemples);
      })
    );
  }
}
