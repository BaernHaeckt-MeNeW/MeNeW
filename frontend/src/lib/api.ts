import { request } from "./request";
import type {Person} from "../model/Person.ts";

export const api = {
    getPersons: () =>
        request<Person[]>(`/persons`, { method: "GET" }),
};