import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { IRecipe } from '../recipe.interface';
import { RecipesService } from '../recipes.service';
@Component({
  selector: 'app-recipes-detail',
  templateUrl: './recipes-detail.page.html',
  styleUrls: ['./recipes-detail.page.scss'],
})
export class RecipesDetailPage implements OnInit {
  currentRecipe: IRecipe;

  constructor(
    private readonly activatedRoute: ActivatedRoute,
    private readonly recipeService: RecipesService,
    private readonly router: Router,
    private readonly alertCtrl: AlertController
  ) {}

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe((param) => {
      if (!param.has('recipeId')) {
        this.router.navigate(['/recipes']);
        return;
      }

      const recipeId = param.get('recipeId');
      this.currentRecipe = this.recipeService.getRecipe(recipeId);
    });
  }

  removeRecipe(): void {
    this.alertCtrl
      .create({
        header: 'Are you sure?',
        message: 'Do you want to delete this recipe?',
        buttons: [
          {
            text: 'Cancel',
            role: 'cancel',
          },
          {
            text: 'Delete',
            handler: () => {
              this.recipeService.deleteRecipe(this.currentRecipe.id);
              this.router.navigate(['/recipes']);
            },
          },
        ],
      })
      .then((alert) => alert.present());
  }
}
