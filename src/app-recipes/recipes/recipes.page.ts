import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { IRecipe } from './recipe.interface';
import { RecipesService } from './recipes.service';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.page.html',
  styleUrls: ['./recipes.page.scss'],
})
export class RecipesPage implements OnInit, OnDestroy {
  recipes: IRecipe[] = [];
  private recipeSub = new Subscription();

  constructor(private recipeService: RecipesService) { }

  ngOnInit() {
    this.recipeSub = this.recipeService.recipeSubject.subscribe(recipes => {
      this.recipes = recipes;
    });
    this.recipeService.getAllRecipes();
  }

  ngOnDestroy(): void {
    this.recipeSub.unsubscribe();
  }
}
