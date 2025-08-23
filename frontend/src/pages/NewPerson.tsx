import React, {useEffect, useState} from "react";
import Nav from "../components/Nav.tsx";
import {api} from "../lib/api.ts";
import type {Diet} from "../model/Diet.ts";
import TagInput from "../components/TagInput.tsx";
import {Button} from "../components/Button.tsx";
import {useNavigate} from "react-router-dom";

export function NewPerson() {
    const navigate = useNavigate();

    const [diets, setDiets] = useState<Diet[]>([]);
    const [gos, setGos] = useState<string[]>([]);
    const [noGos, setNoGos] = useState<string[]>([]);

    useEffect(() => {
        api.fetchDiets().then(setDiets);
    }, []);

    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const form = e.currentTarget;
        const data = new FormData(form);

        const name = (data.get("name") as string)?.trim() ?? "";

        const selectedDietIds = new Set((data.getAll("diet") as string[]).map(String));

        const selectedDietNames = diets
            .filter(d => selectedDietIds.has(String(d.id)))
            .map(d => d.id);

        const person = {
            name,
            diets: selectedDietNames,
            gos,
            noGos,
        };

        api.createPerson(person).then(() => navigate("/"));
    };

    return (
        <>
            <Nav backButton topCenterElement={<img src={"/assets/logo.svg"} alt="Logo" className="w-24 mx-auto"/>} topRightElement={<div className={"w-[40px]"}></div>}/>
            <form onSubmit={onSubmit}>
                <section className="pt-2 pb-10">
                    <h1 className="text-3xl font-bold my-4">Neue Person</h1>
                    <input
                        name="name"
                        type="text"
                        className="w-full p-2 border rounded focus:ring-1 focus:ring-blue-100"
                        placeholder="Name der Person"
                        required
                    />
                </section>

                <section className="pb-4">
                    <h2 className="text-2xl font-bold mb-4">Ernährungsformen</h2>
                    <div className="space-y-4 grid grid-cols-2">
                        {diets.map(diet => (
                            <div key={diet.id} className="flex items-center">
                                <input
                                    id={`diet-${diet.id}`}
                                    name="diet"
                                    type="checkbox"
                                    value={String(diet.id)}
                                    className="h-4 w-4 accent-background focus:ring-green-200 border-gray-300 rounded"
                                />
                                <label htmlFor={`diet-${diet.id}`} className="ml-2 block text-base">
                                    {diet.name}
                                </label>
                            </div>
                        ))}
                    </div>
                </section>

                <section className="pb-4">
                    <h2 className="text-2xl font-bold my-4">Fokus</h2>
                    <TagInput value={gos} onChange={setGos} placeholder="Tippe und drücke Enter..." tagColor="green" />
                </section>

                <section className="pb-4">
                    <h2 className="text-2xl font-bold my-4">No Go</h2>
                    <TagInput value={noGos} onChange={setNoGos} placeholder="Tippe und drücke Enter..." tagColor="warn" />
                </section>

                <section className="pt-4">
                    <Button type="submit">
                        Person speichern
                    </Button>
                </section>
            </form>
        </>
    );
}
