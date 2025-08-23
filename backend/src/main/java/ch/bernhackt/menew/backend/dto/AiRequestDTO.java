package ch.bernhackt.menew.backend.dto;

import ch.bernhackt.menew.backend.entity.Meal;
import ch.bernhackt.menew.backend.entity.MealTime;

import java.time.LocalDate;

public record AiRequestDTO(
        String name,
        Long[] diets,
        String[] gos,
        String[] noGos
) {
}
