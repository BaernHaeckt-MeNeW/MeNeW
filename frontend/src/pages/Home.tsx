import {useEffect, useState} from "react";
import {api} from "../lib/api.ts";
import Nav from "../components/Nav.tsx";
import type {Meal} from "../model/Meal.ts";
import {MealCard} from "../components/MealCard.tsx";
import NoMealCard from "../components/NoMealCard.tsx";
import {Link, useNavigate} from "react-router-dom";
import {Users} from "lucide-react";
import {MealInsightTable} from "../components/MealInsightTable.tsx";

export default function Home() {
    const [meals, setMeals] = useState<Meal[] | null>(null);
    const navigate = useNavigate();

    useEffect(() => {
        api.getPersons().then(persons => {
            if (persons.length === 0) {
                navigate("/household");
            }
        })
    }, [navigate]);

    useEffect(() => {
        api.getMeals()
            .then((data) => setMeals(data))
    }, [])

    if (meals === null) {
        return <div></div>;
    }

    const hasBreakfast = meals.some(m => m.mealTime === 'BREAKFAST');
    const hasLunch = meals.some(m => m.mealTime === 'LUNCH');
    const hasDinner = meals.some(m => m.mealTime === 'DINNER');

    return <>
        <Nav
            topLeftElement={
                <h1 className={"font-bold text-2xl"}>Hallo, Marco!</h1>
            }
            topRightElement={
            <Link to={"/household"}>
                <Users/>
            </Link>
        }/>
        <div>
            <MealInsightTable meals={meals}/>
        </div>
        <h1 className={"font-bold text-3xl mb-10 text-center"}>Samstag, 23. Aug.</h1>
        <div className="grid grid-cols-1 gap-4 justify-center">
            {hasBreakfast ? <>
                    {meals.filter(m => m.mealTime === 'BREAKFAST')?.map((meal, index) => (
                        <MealCard key={index} name={meal.name} mealTime={"Morgenessen"}/>
                    ))}
                </> :
                <>
                    <NoMealCard text={"Für das Frühstück hast du noch nichts geplant."}>
                    </NoMealCard>

                </>}
            {hasLunch ? <>
                    {meals.filter(m => m.mealTime === 'LUNCH')?.map((meal, index) => (
                        <MealCard key={index} name={meal.name} mealTime={"Mittagessen"}/>
                    ))}
                </> :
                <NoMealCard text={"Für das Mittagessen hast du noch nichts geplant."}>
                </NoMealCard>}
            {hasDinner ? <>
                    {meals.filter(m => m.mealTime === 'DINNER')?.map((meal, index) => (
                        <MealCard key={index} name={meal.name} mealTime={"Abendessen"}/>
                    ))}
                </> :
                <>
                <NoMealCard text={"Für das Abendessen hast du noch nichts geplant."}>
                </NoMealCard>

                </>}
        </div>
    </>
}