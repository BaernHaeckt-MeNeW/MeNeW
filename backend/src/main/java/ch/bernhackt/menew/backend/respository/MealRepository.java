package ch.bernhackt.menew.backend.respository;

import ch.bernhackt.menew.backend.entity.Meal;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MealRepository extends JpaRepository<Meal, Long> {

}
