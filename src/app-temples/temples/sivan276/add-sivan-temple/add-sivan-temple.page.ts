import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { TemplesService } from '../../temples.service';

@Component({
  selector: 'app-add-sivan-temple',
  templateUrl: './add-sivan-temple.page.html',
  styleUrls: ['./add-sivan-temple.page.scss'],
})
export class AddSivanTemplePage implements OnInit {
  @ViewChild('createForm', { static: true }) addTempleFormRef: NgForm;

  constructor(
    private templesService: TemplesService,
    private loadingCtrl: LoadingController,
    private router: Router
  ) {}

  ngOnInit() {}

  onCreateTemple() {
    if (!this.addTempleFormRef.valid) {
      return;
    }
    this.loadingCtrl
      .create({
        message: 'Adding new Offer...',
      })
      .then((loaderEl) => {
        loaderEl.present();
        this.templesService
          .addTemple(
            +this.addTempleFormRef.controls.templeNo?.value,
            this.addTempleFormRef.controls.title?.value,
            this.addTempleFormRef.controls.description?.value,
            this.addTempleFormRef.controls.imageUrl?.value,
            this.addTempleFormRef.controls.place?.value,
            this.addTempleFormRef.controls.district?.value,
            this.addTempleFormRef.controls.state?.value,
            this.addTempleFormRef.controls.legend?.value,
            'all',
            this.addTempleFormRef.controls.youtube?.value,
            this.addTempleFormRef.controls.wiki?.value,
          )
          .subscribe(() => {
            this.loadingCtrl.dismiss();
            this.addTempleFormRef.reset();
            this.router.navigateByUrl('/temples/sivan276');
          });
      });
  }
}
