import {useEffect, useState} from "react";
import {api} from "../lib/api.ts";
import Nav from "../components/Nav.tsx";
import type {Meal} from "../model/Meal.ts";
import {MealCard} from "../components/MealCard.tsx";

export default function Home() {
    const [meals, setMeals] = useState<Meal[]>([]);

    useEffect(() => {
        api.getMeals()
            .then((data) => setMeals(data))
    }, [])

    return <>
        <Nav backButton/>
        <h1 className={"font-bold text-2xl mb-5"}>Hallo, Marco!</h1>
        <div>
            <img src={"/assets/home.png"} alt="Household" className="w-60 h-60 rounded-3xl mx-auto mb-4"/>
        </div>
        <h1 className={"font-bold text-3xl mb-5 text-center"}>Samstag, 23. Aug.</h1>
        <div className="grid grid-cols-1 gap-4 justify-center">
            {meals.filter(m => m.mealTime === 'BREAKFAST')?.map((meal, index) => (
                <MealCard key={index} name={meal.name} mealTime={"Morgenessen"}/>
            ))}
            {meals.filter(m => m.mealTime === 'LUNCH')?.map((meal, index) => (
                <MealCard key={index} name={meal.name} mealTime={"Mittagessen"}/>
            ))}
            {meals.filter(m => m.mealTime === 'DINNER')?.map((meal, index) => (
                <MealCard key={index} name={meal.name} mealTime={"Abendessen"}/>
            ))}
        </div>
    </>
}