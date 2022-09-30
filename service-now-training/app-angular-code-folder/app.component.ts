import { Component, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'learn-angular';
  spanContect = 'span content';

  showSpanRed = true;

  inputValue = 'example';

  ngOnChanges(changes: SimpleChanges): void {
    console.log(this.inputValue, ' inputValue');
  }

  submitHandler() {}
}
