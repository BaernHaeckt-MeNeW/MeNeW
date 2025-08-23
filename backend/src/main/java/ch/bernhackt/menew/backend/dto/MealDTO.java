package ch.bernhackt.menew.backend.dto;

import ch.bernhackt.menew.backend.entity.Meal;
import ch.bernhackt.menew.backend.entity.MealTime;

import java.time.LocalDate;

public record MealDTO(
        Long id,
        String name,
        MealTime mealTime,
        LocalDate plannedMealDate
) {
    public static MealDTO fromEntity(Meal meal) {
        return new MealDTO(
                meal.getId(),
                meal.getName(),
                meal.getMealTime(),
                meal.getPlannedMealDate()
        );
    }
}