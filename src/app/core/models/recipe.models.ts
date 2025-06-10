import { Base, Paginated } from "./base.models";

export interface Recipes extends Paginated {
    recipes: RecipeDTO[];
}

export interface RecipeDTO extends Base {
    name: string;
    ingredients: string[];
    instructions: string[];
    prepTimeMinutes: number;
    cookTimeMinutes: number;
    userId: number;
    // left out other fields intentionally
}

export const recipeKeys: (keyof RecipeDTO)[] = [
    'id', 'name', 'ingredients', 'instructions', 'prepTimeMinutes', 'cookTimeMinutes', 'userId'
];
