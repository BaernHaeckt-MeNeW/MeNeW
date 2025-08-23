import {useEffect, useState} from "react";
import {api} from "../lib/api.ts";
import Nav from "../components/Nav.tsx";
import type {Meal} from "../model/Meal.ts";
import {MealCard} from "../components/MealCard.tsx";
import NoMealCard from "../components/NoMealCard.tsx";
import {Link, useNavigate} from "react-router-dom";
import {ChevronLeft, ChevronRight, Users} from "lucide-react";
import {MealInsightTable} from "../components/MealInsightTable.tsx";

const WEEK_DAYS = ['So', 'Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa'];
const TODAY = new Date();

export default function Home() {
    const glowClasses =
        "cursor-pointer p-1 rounded-xl transition " +
        "hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.6)] " +
        "active:drop-shadow-[0_0_8px_rgba(255,255,255,0.6)]";

    const [selectedDate, setSelectedDate] = useState<Date>(new Date());
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

    const todaysMeals = meals.filter(m => m.plannedMealDate === new Date().toISOString().split('T')[0]);

    const hasBreakfast = todaysMeals.some(m => m.mealTime === 'BREAKFAST');
    const hasLunch = todaysMeals.some(m => m.mealTime === 'LUNCH');
    const hasDinner = todaysMeals.some(m => m.mealTime === 'DINNER');

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
        <div className={"mt-2 mb-10"}>
            <MealInsightTable meals={meals}/>
        </div>
        <div className={"w-full flex items-center justify-center gap-8 mb-10 mx-auto"}>
            <div className={glowClasses} onClick={() => {
                setSelectedDate(current => {
                    const newDate = new Date(current);
                    newDate.setDate(newDate.getDate() - 1);
                    return newDate;
                });
            }}>
                <ChevronLeft/>
            </div>
            <h1 className={"text-3xl text-center w-fit rounded-sm px-4 py-2  bg-clip-text text-white"}>{
                selectedDate.toDateString() === TODAY.toDateString() ? "Heute" : `${WEEK_DAYS[selectedDate.getDay()]}, ${selectedDate.getDate()}.${selectedDate.getMonth() + 1}`
            }</h1>
            <div className={glowClasses} onClick={() => {
                setSelectedDate(current => {
                    const newDate = new Date(current);
                    newDate.setDate(newDate.getDate() + 1);
                    return newDate;
                });
            }}>
                <ChevronRight/>
            </div>
        </div>
        <div className="grid grid-cols-1 gap-4 justify-center">
            {hasBreakfast ? <>
                    {todaysMeals.filter(m => m.mealTime === 'BREAKFAST')?.map((meal, index) => (
                        <MealCard key={index} name={meal.name} mealTime={"Morgenessen"}/>
                    ))}
                </> :
                <>
                    <NoMealCard text={"Für das Frühstück hast du noch nichts geplant."}>
                    </NoMealCard>

                </>}
            {hasLunch ? <>
                    {todaysMeals.filter(m => m.mealTime === 'LUNCH')?.map((meal, index) => (
                        <MealCard key={index} name={meal.name} mealTime={"Mittagessen"}/>
                    ))}
                </> :
                <NoMealCard text={"Für das Mittagessen hast du noch nichts geplant."}>
                </NoMealCard>}
            {hasDinner ? <>
                    {todaysMeals.filter(m => m.mealTime === 'DINNER')?.map((meal, index) => (
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