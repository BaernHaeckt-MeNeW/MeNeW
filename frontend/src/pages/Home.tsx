import {useEffect, useState} from "react";
import {api} from "../lib/api.ts";
import Nav from "../components/Nav.tsx";
import type {Meal} from "../model/Meal.ts";
import {MealCard} from "../components/MealCard.tsx";
import NoMealCard from "../components/NoMealCard.tsx";
import {Link, useNavigate} from "react-router-dom";
import {ChevronLeft, ChevronRight, Users} from "lucide-react";
import {MealInsightTable} from "../components/MealInsightTable.tsx";
import {DatePickerPopUp} from "../components/DatePickerPopUp.tsx";

const WEEK_DAYS = ['So', 'Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa'];
const TODAY = new Date();

export default function Home() {
    const glowClasses =
        "cursor-pointer p-1 rounded-xl transition " +
        "hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.6)] " +
        "active:drop-shadow-[0_0_8px_rgba(255,255,255,0.6)]";

    const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);
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

    const selectedDatesMeals = meals.filter(m => m.plannedMealDate === selectedDate.toISOString().split('T')[0]);

    const hasBreakfast = selectedDatesMeals.some(m => m.mealTime === 'BREAKFAST');
    const hasLunch = selectedDatesMeals.some(m => m.mealTime === 'LUNCH');
    const hasDinner = selectedDatesMeals.some(m => m.mealTime === 'DINNER');

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
        <DatePickerPopUp selectedDate={selectedDate} isOpen={isDatePickerOpen} onClose={() => setIsDatePickerOpen(false)}/>
        <div className={"mt-2 mb-10"} onClick={() => setIsDatePickerOpen(true)}>
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
                    {selectedDatesMeals.filter(m => m.mealTime === 'BREAKFAST')?.map((meal, index) => (
                        <MealCard key={index} name={meal.name} mealTime={"Frühstück"}/>
                    ))}
                </> :
                <>
                    <NoMealCard text={"Für das Frühstück hast Du noch nichts geplant."} date={selectedDate} mealType={"BREAKFAST"}>
                    </NoMealCard>

                </>}
            {hasLunch ? <>
                    {selectedDatesMeals.filter(m => m.mealTime === 'LUNCH')?.map((meal, index) => (
                        <MealCard key={index} name={meal.name} mealTime={"Mittagessen"}/>
                    ))}
                </> :
                <NoMealCard text={"Für das Mittagessen hast Du noch nichts geplant."} date={selectedDate} mealType={"LUNCH"}>
                </NoMealCard>}
            {hasDinner ? <>
                    {selectedDatesMeals.filter(m => m.mealTime === 'DINNER')?.map((meal, index) => (
                        <MealCard key={index} name={meal.name} mealTime={"Abendessen"}/>
                    ))}
                </> :
                <>
                    <NoMealCard text={"Für das Abendessen hast Du noch nichts geplant."} date={selectedDate} mealType={"DINNER"}>
                    </NoMealCard>

                </>}
        </div>
    </>
}