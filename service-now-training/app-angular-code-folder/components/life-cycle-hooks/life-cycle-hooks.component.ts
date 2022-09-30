import {
  AfterContentChecked,
  AfterContentInit,
  AfterViewChecked,
  AfterViewInit,
  Component,
  DoCheck,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  SimpleChanges,
} from '@angular/core';

@Component({
  selector: 'app-life-cycle-hooks',
  templateUrl: './life-cycle-hooks.component.html',
  styleUrls: ['./life-cycle-hooks.component.scss'],
})
export class LifeCycleHooksComponent implements OnInit, OnChanges, OnDestroy, AfterViewInit, DoCheck, AfterContentInit, AfterViewChecked, AfterContentChecked{

  @Input() title = '';
  constructor() {}

  ngOnInit(): void {
    console.log('ONINIT when component is initialised');
  }

  ngOnChanges(): void {
    console.log('When Your component input property changes ONCHANGE');
  }

  ngOnDestroy(): void {
    console.log('ONDESTROY when component is removed from DOM');
  }

  ngAfterViewInit(): void {
      console.log('AFTERVIEWINIT After your DOM is initialised so that u get access');
  }

  ngDoCheck(): void {
      console.log('DOCHECK every time change detection happens in angular');
  }

  ngAfterContentInit(): void {
      console.log('AFTERCONTENTINIT after external components initialised');
  }

  ngAfterViewChecked(): void {
    console.log('AFTERVIEWCHECKED');
  }

  ngAfterContentChecked(): void {
    console.log('AFTERCONTENTCHECKED');
  }
}
