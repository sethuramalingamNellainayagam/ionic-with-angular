import { Component, ViewChild } from '@angular/core';
import { IonSlides } from '@ionic/angular';

@Component({
  selector: 'app-temples',
  templateUrl: './temples.page.html',
  styleUrls: ['./temples.page.scss'],
})
export class TemplesPage {
  @ViewChild('slider', { static: true }) private slider: IonSlides;

  public slideOpts = {
    initialSlide: 1,
    speed: 400
  };

  constructor() {}

   public async ionSlideDidChange(): Promise<void> {
     const index = await this.slider.getActiveIndex();

   }

}
