import {useEffect, useState} from "react";
import {api} from "../lib/api.ts";
import Nav from "../components/Nav.tsx";
import type {Meal} from "../model/Meal.ts";
import {MealCard} from "../components/MealCard.tsx";
import NoMealCard from "../components/NoMealCard.tsx";

export default function Home() {
    const [meals, setMeals] = useState<Meal[]>([]);

    useEffect(() => {
        api.getMeals()
            .then((data) => setMeals(data))
    }, [])

    const hasBreakfast = meals.some(m => m.mealTime === 'BREAKFAST');
    const hasLunch = meals.some(m => m.mealTime === 'LUNCH');
    const hasDinner = meals.some(m => m.mealTime === 'DINNER');

    return <>
        <Nav backButton/>
        <h1 className={"font-bold text-2xl mb-5"}>Hallo, Marco!</h1>
        <div>
            <img src={"/assets/home.png"} alt="Household" className="w-60 h-60 rounded-3xl mx-auto mb-4"/>
        </div>
        <h1 className={"font-bold text-3xl mb-5 text-center"}>Samstag, 23. Aug.</h1>
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