package ch.bernhackt.menew.backend.dto;

import ch.bernhackt.menew.backend.entity.MealTime;

import java.time.LocalDate;
import java.util.List;

public record GetInspirationDTO(
        QuestionAndAnswerDTO[] questionsAndAnswers,
        List<String> lastInspirations,
        LocalDate date,
        MealTime mealType
) {
}
