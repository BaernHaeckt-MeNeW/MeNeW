package ch.bernhackt.menew.backend.respository;

import ch.bernhackt.menew.backend.entity.Meal;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

public interface MealRepository extends JpaRepository<Meal, Long> {
    List<Meal> findByPlannedMealDate(LocalDate plannedMealDate);
}
