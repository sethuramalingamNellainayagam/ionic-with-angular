import { AfterViewInit, Component, ElementRef, HostListener, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styleUrls: ['./pages.component.scss'],
})
export class PagesComponent implements OnInit, OnDestroy, AfterViewInit {
  inputValue: string = '';
  routeSubscription: Subscription = new Subscription();
  @ViewChild('inputNote') inputTextAreaEl!: ElementRef;

  constructor(private router: Router) {}

  @HostListener('input') onUserInput() {
    const getPage = this.router.url;
    sessionStorage.setItem(getPage, this.inputValue);
  }

  ngOnInit(): void {
    this.inputValue = sessionStorage.getItem(this.router.url) || '';
  }

  ngAfterViewInit(): void {
    this.inputTextAreaEl.nativeElement.focus();
  }

  ngOnDestroy(): void {
    sessionStorage.removeItem(this.router.url);
    this.routeSubscription.unsubscribe();
  }
}
