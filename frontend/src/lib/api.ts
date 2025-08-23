import {request} from "./request";
import type {Person} from "../model/Person.ts";
import type {Diet} from "../model/Diet.ts";
import type {Meal} from "../model/Meal.ts";
import type {CreatePerson} from "../model/CreatePerson.ts";
import type {MealType} from "../model/MealType.ts";
import type {CreateMeal} from "../model/CreateMeal.ts";

export const api = {
    getPersons: () =>
        request<Person[]>(`/api/persons`, { method: "GET" }),
    getMeals: () =>
        request<Meal[]>(`/api/meals`, { method: "GET" }),
    fetchDiets: () =>
        request<Diet[]>(`/api/diets`, {method: "GET"}),
    createPerson: (person: Omit<CreatePerson, "id">) =>
        request<void>(`/api/persons`, {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(person),
        }),
    getInspiration: (questionsAndAnswers: { question: string; answer: string }[], date: Date, mealType: MealType, lastInspirations: string[]) =>
        request<{ideas: string[]}>(`/api/inspiration`, {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({questionsAndAnswers: questionsAndAnswers, date: date.toISOString().split('T')[0], mealType, lastInspirations}),
        }),
    createMeal: (meal: CreateMeal) =>
        request<void>(`/api/meals`, {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(meal),
        }),
};