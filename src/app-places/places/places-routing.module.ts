import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PlacesPage } from './places.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: PlacesPage,
    children: [
      {
        path: 'search',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('./search/search.module').then((m) => m.SearchPageModule),
          },
          {
            path: ':placeId',
            loadChildren: () =>
              import('./search/place-detail/place-detail-routing.module').then(
                (m) => m.PlaceDetailPageRoutingModule
              ),
          },
        ],
      },
      {
        path: 'offers',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('./offers/offers.module').then((m) => m.OffersPageModule),
          },
          {
            path: 'new',
            loadChildren: () =>
              import('./offers/new-offer/new-offer-routing.module').then(
                (m) => m.NewOfferPageRoutingModule
              ),
          },
          {
            path: 'edit/:placeId',
            loadChildren: () =>
              import('./offers/edit-offer/edit-offer-routing.module').then(
                (m) => m.EditOfferPageRoutingModule
              ),
          },
          {
            path: ':placeId',
            loadChildren: () =>
              import(
                './offers/offer-bookings/offer-bookings-routing.module'
              ).then((m) => m.OfferBookingsPageRoutingModule),
          },
        ],
      },
      {
        path: '',
        redirectTo: '/places/tabs/search',
        pathMatch: 'full',
      },
    ],
  },
  {
    path: '',
    redirectTo: '/places/tabs/search',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes), CommonModule],
  exports: [RouterModule],
})
export class PlacesPageRoutingModule {}
