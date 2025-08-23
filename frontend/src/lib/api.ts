import {request} from "./request";
import type {Person} from "../model/Person.ts";
import type {Diet} from "../model/Diet.ts";
import type {Meal} from "../model/Meal.ts";
import type {CreatePerson} from "../model/CreatePerson.ts";

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
    getInspiration: (questionsAndAnswers: { question: string; answer: string }[]) =>
        request<{ideas: string[]}>(`/api/inspiration`, {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({questionsAndAnswers: questionsAndAnswers}),
        }),
};