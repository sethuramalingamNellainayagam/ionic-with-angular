import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { IRecipe } from './recipe.interface';

@Injectable({
  providedIn: 'root'
})
export class RecipesService {
  recipeSubject = new Subject<IRecipe[]>();
  private recipes: IRecipe[] = [
    {
      id: 'recipe1',
      title: 'Gobi manchurian',
      imageUrl: 'https://1.bp.blogspot.com/' +
      '-VpilfwtACGo/YG2RxWqicXI/AAAAAAABFi0/' +
      '119IQ-r-s_QutJCfd56XdajLyiHA0LhCgCLcBGAsYHQ/s643/Street%2Bstyle%2Bgobi%2Bmanchurian%2Brecipe.JPG',
      ingredients: ['cauli flower', 'maida', 'corn flour', 'kashmiri chilli', 'pepper']
    },
    {
      id: 'recipe2',
      title: 'Mushroom pepper fry',
      imageUrl: 'https://myfoodstory.com/wp-content/uploads/2020/09/Mushroom-Pepper-Fry-3.jpg',
      ingredients: ['mushroom', 'coconut oil', 'mustard seeds', 'ginger', 'garlic', 'curry leaves']
    }
  ];

  constructor() { }

  getAllRecipes(): void {
    this.recipes = [...this.recipes];
    this.recipeSubject.next(this.recipes);
  }

  getRecipe(recipeId: string): IRecipe {
    return {...this.recipes.find(recipe => recipe.id === recipeId)};
  }

  deleteRecipe(recipeId: string) {
    this.recipes = this.recipes.filter(recipe => recipeId !== recipe.id);
    this.recipeSubject.next(this.recipes);
  }
}
