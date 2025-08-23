import type {MealType} from "./MealType.ts";


export interface Meal {
    id: number;
    name: string;
    mealTime: MealType;
    plannedMealDate: string;
}