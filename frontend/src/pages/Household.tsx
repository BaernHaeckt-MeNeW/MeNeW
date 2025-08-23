import {useEffect} from "react";
import {PersonCard} from "../components/PersonCard.tsx";
import Card from "../components/Card.tsx";
import { CirclePlus  } from "lucide-react";
import Nav from "../components/Nav.tsx";

export default function Household() {

    //const [persons, setPersons] = useState<Person[]>([]);

    const persons =[
        { id: 1, name: "Alice", diets: ["Vegetarian"], tags: [] },
        { id: 2, name: "Bob", diets: ["Vegan"], tags: [] },
        { id: 3, name: "Charlie", diets: ["Gluten-Free"], tags: [] },
    ]

    useEffect(() => {
        //api.getPersons()
        //    .then((data) => setPersons(data))
    }, [])

    return <>
        <Nav backButton />
        <div>
            <img src={"/assets/household_img.png"} alt="Household" className="w-60 h-60 rounded-3xl mx-auto mb-4"/>
        </div>
        <h1 className={"w-full text-center mb-10 mt-5 text-4xl font-extrabold"}>Mein Haushalt</h1>
        <div className="grid grid-cols-1 gap-4 justify-center">
            {persons.map((person, index) => (
                <PersonCard key={index} name={person.name}/>
            ))}
            <Card icon={<CirclePlus  className="w-8 h-8"/>} />
        </div>
    </>
    ;
}