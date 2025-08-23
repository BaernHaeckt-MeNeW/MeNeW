import type {Tag} from "./Tag.ts";

export interface Person {
    id: number;
    name: string;
    diets: string[];
    tags: Tag[];
}