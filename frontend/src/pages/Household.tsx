import {useEffect, useState} from "react";
import {PersonCard} from "../components/PersonCard.tsx";
import Card from "../components/Card.tsx";
import {CirclePlus} from "lucide-react";
import Nav from "../components/Nav.tsx";
import {Link} from "react-router-dom";
import {api} from "../lib/api.ts";
import type {Person} from "../model/Person.ts";

export default function Household() {

    const [persons, setPersons] = useState<Person[]>([]);

    useEffect(() => {
        api.getPersons()
            .then((data) => setPersons(data))
    }, [])

    return <>
        <Nav backButton/>
        <div>
            <img src={"/assets/household_img.png"} alt="Household" className="w-60 h-60 rounded-3xl mx-auto mb-4"/>
        </div>
        <div className="grid grid-cols-1 gap-4 justify-center">
            {persons.map((person, index) => (
                <PersonCard key={index} name={person.name}/>
            ))}
            <Link to="/new-person">
                <Card icon={<CirclePlus className="w-8 h-8"/>} interactive/>
            </Link>

        </div>
    </>
        ;
}