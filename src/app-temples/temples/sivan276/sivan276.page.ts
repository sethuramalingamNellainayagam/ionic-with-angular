import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Temple } from '../temple.model';
import { TemplesService } from '../temples.service';

@Component({
  selector: 'app-sivan276',
  templateUrl: './sivan276.page.html',
  styleUrls: ['./sivan276.page.scss'],
})
export class Sivan276Page implements OnInit, OnDestroy {
  sivan276Temples: Temple[] = [];
  isLoading = false;
  private templesSubscription: Subscription;

  constructor(private templesService: TemplesService, private router: Router) {}

  ngOnInit() {
    this.templesSubscription = this.templesService.temples.subscribe(
      (temples: Temple[]) => {
        this.sivan276Temples = temples;
      }
    );
  }

  ionViewWillEnter(): void {
    this.isLoading = true;
    this.templesService.fetchTemples().subscribe(() => {
      this.isLoading = false;
    });
  }

  ngOnDestroy(): void {
    if (this.templesSubscription) {
      this.templesSubscription.unsubscribe();
    }
  }
}
