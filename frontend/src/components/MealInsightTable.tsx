import type { Meal } from "../model/Meal.ts";
import type { MealType } from "../model/MealType.ts";

interface MealInsightTableProps {
    meals: Meal[];
}

const mealTypeOrder: MealType[] = ["BREAKFAST", "LUNCH", "DINNER"];

export function MealInsightTable({ meals }: MealInsightTableProps) {
    // 7 columns: today until 6 days in future
    const next7Days = Array.from({ length: 7 }, (_, i) => {
        const date = new Date();
        date.setDate(date.getDate() + i);
        return date;
    });

    // Hilfsfunktion: ISO-Datum (YYYY-MM-DD) extrahieren
    const formatDate = (date: Date) => date.toISOString().split("T")[0];

    // Meals nach Datum + MealType organisieren
    const mealsByDayAndType: Record<string, Record<MealType, Meal | null>> = {};
    next7Days.forEach((day) => {
        const iso = formatDate(day);
        mealsByDayAndType[iso] = {
            BREAKFAST: null,
            LUNCH: null,
            DINNER: null,
        };
    });

    meals.forEach((meal) => {
        const dateKey = meal.plannedMealDate.split("T")[0];
        if (mealsByDayAndType[dateKey]) {
            mealsByDayAndType[dateKey][meal.mealTime] = meal;
        }
    });

    return (
        <div className="grid grid-cols-7 gap-2">
            {mealTypeOrder.map((mealType) =>
                next7Days.map((day) => {
                    const iso = formatDate(day);
                    const meal = mealsByDayAndType[iso]?.[mealType];

                    return (
                        <div
                            key={`${iso}-${mealType}`}
                            className="border p-2 rounded min-h-[60px] flex items-center justify-center text-sm text-center"
                        >
                            {meal ? meal.name : "-"}
                        </div>
                    );
                })
            )}
        </div>
    );
}
