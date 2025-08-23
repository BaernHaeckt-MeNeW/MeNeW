package ch.bernhackt.menew.backend.dto;

import ch.bernhackt.menew.backend.entity.MealTime;

import java.time.LocalDate;

public record GetInspirationDTO(
        QuestionAndAnswerDTO[] questionsAndAnswers,
        LocalDate date,
        MealTime mealType
) {
}
