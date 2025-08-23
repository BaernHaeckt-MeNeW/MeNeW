import {request} from "./request";
import type {Person} from "../model/Person.ts";
import type {Diet} from "../model/Diet.ts";
import type {Meal} from "../model/Meal.ts";

export const api = {
    getPersons: () =>
        request<Person[]>(`/api/persons`, { method: "GET" }),
    getMeals: () =>
        request<Meal[]>(`/api/meals`, { method: "GET" }),
    fetchDiets: () =>
        request<Diet[]>(`/api/diets`, {method: "GET"}),
    createPerson: (person: Omit<Person, "id">) =>
        request<Person>(`/api/persons`, {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(person),
        }),
};