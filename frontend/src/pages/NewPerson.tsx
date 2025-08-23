import Nav from "../components/Nav.tsx";
import {useEffect, useState} from "react";
import {api} from "../lib/api.ts";
import type {Diet} from "../model/Diet.ts";
import TagInput from "../components/TagInput.tsx";
import {Button} from "../components/Button.tsx";

export function NewPerson() {

    const [diets, setDiets] = useState<Diet[]>([]);
    const [gos, setGos] = useState<string[]>([]);
    const [noGos, setNoGos] = useState<string[]>([]);

    useEffect(() => {
        api.fetchDiets().then(setDiets);
    }, []);

    const onSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const person = {
            name: (e.target as HTMLFormElement)[0].value,
            diets: diets.filter((diet, index) => (e.target as HTMLFormElement)[index + 1].checked).map(diet => diet.id),
            gos,
            noGos
        }
        console.log("Form submitted", person);
        api.createPerson(person).then(() => {
            window.history.back();
        });
    }

    return <>
        <Nav backButton/>
        <form onSubmit={onSubmit}>
            <section className={"pt-2 pb-10"}>
                <h1 className="text-3xl font-bold my-4">Neue Person</h1>
                <input
                    type="text"
                    className="w-full p-2 border rounded focus-within:ring-1 focus-within:ring-blue-100"
                    placeholder="Name der Person"
                />
            </section>
            <section className={"pb-4"}>
                <h2 className="text-2xl font-bold mb-4">Ernährungsformen</h2>
                <div className="space-y-4 grid grid-cols-2">
                    {diets.map(diet => (
                        <div key={diet.id} className="flex items-center">
                            <input
                                id={`diet-${diet.id}`}
                                type="checkbox"
                                className="h-4 w-4 accent-background focus:ring-green-200 border-gray-300 rounded"
                            />
                            <label htmlFor={`diet-${diet.id}`} className="ml-2 block text-base">
                                {diet.name}
                            </label>
                        </div>
                    ))}
                </div>
            </section>
            <section className={"pb-4"}>
                <h2 className="text-2xl font-bold my-4">Fokus</h2>
                <TagInput
                    value={gos}
                    onChange={setGos}
                    placeholder="Tippe und drücke Enter..."
                    tagColor="green"
                />
            </section>
            <section className={"pb-4"}>
                <h2 className="text-2xl font-bold my-4">No Go</h2>
                <TagInput
                    value={noGos}
                    onChange={setNoGos}
                    placeholder="Tippe und drücke Enter..."
                    tagColor="warn"
                />
            </section>
            <section className={"pt-4"}>
                <Button
                    type="submit"
                    className="fixed bottom-4 left-1/2 transform -translate-x-1/2 bg-background text-white px-6 py-3 rounded-full shadow-lg hover:bg-background-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-background"
                >
                    Person speichern
                </Button>
            </section>
        </form>
    </>;
}