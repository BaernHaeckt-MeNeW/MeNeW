import {request} from "./request";
import type {Person} from "../model/Person.ts";
import type {Diet} from "../model/Diet.ts";


export const api = {
    getPersons: () =>
        request<Person[]>(`/api/persons`, {method: "GET"}),
    fetchDiets: () =>
        request<Diet[]>(`/api/diets`, {method: "GET"}),
    createPerson: (person: Omit<Person, "id">) =>
        request<Person>(`/api/persons`, {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(person),
        }),
};