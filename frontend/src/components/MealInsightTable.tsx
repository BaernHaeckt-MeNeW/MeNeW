import type {Meal} from "../model/Meal.ts";

interface MealInsightGridProps {
    meals: Meal[];
}

const WEEK_DAYS = ['So', 'Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa'];


export function MealInsightTable({meals}: MealInsightGridProps) {
    const last7andNext13Days = Array.from({length: 21}, (_, i) => {
        const date = new Date();
        date.setDate(date.getDate() - 7 + i);
        return date;
    });

    const colors = {
        1: "#c6f6d5",
        2: "#9ae6b4",
        3: "#68d391",
    }

    const today = new Date();

    const columnLabels = [
        WEEK_DAYS[today.getDay()],
        WEEK_DAYS[(today.getDay() + 1) % 7],
        WEEK_DAYS[(today.getDay() + 2) % 7],
        WEEK_DAYS[(today.getDay() + 3) % 7],
        WEEK_DAYS[(today.getDay() + 4) % 7],
        WEEK_DAYS[(today.getDay() + 5) % 7],
        WEEK_DAYS[(today.getDay() + 6) % 7],
    ]

    const plannedMealsByDate = (date: Date): number => {
        const dateString = date.toISOString().split('T')[0];
        return meals.filter(meal => meal.plannedMealDate === dateString).length;
    }

    return (
        <div className={"grid grid-cols-7 gap-2.5 w-fit mx-auto"}>

            {columnLabels.map((label, index) => (
                <div key={index} className={"w-6 h-6 flex items-center justify-center"}>
                    {label}
                </div>
            ))}

            {last7andNext13Days.map((date, index) => {
                const numberOfPlannedMeals = Math.min(plannedMealsByDate(date));
                const isToday = date.toDateString() === today.toDateString();
                if (isToday) {
                    return <div key={index} className={"w-6 h-6 rounded-sm bg-gradient-to-r from-pink-500 to-blue-500 opacity-60"}>
                        <div className={"w-full h-full bg-gradient-to-r  opacity-75"}>

                        </div>
                    </div>
                } else if (numberOfPlannedMeals === 0) {
                    return <div key={index} className={"w-6 h-6 rounded-sm bg-white"}>
                    </div>
                } else {
                    return <div key={index} className={"w-6 h-6 rounded-sm"} style={{
                        backgroundColor: colors[Math.min(plannedMealsByDate(date), 3) as 1 | 2 | 3]
                    }}>
                    </div>
                }
            })}
        </div>
    );
}
