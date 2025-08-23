package ch.bernhackt.menew.backend;

import ch.bernhackt.menew.backend.entity.Meal;
import ch.bernhackt.menew.backend.entity.MealTime;
import ch.bernhackt.menew.backend.entity.Person;
import ch.bernhackt.menew.backend.respository.MealRepository;
import ch.bernhackt.menew.backend.respository.PersonRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

import java.time.LocalDate;
import java.util.Collections;
import java.util.List;

@SpringBootApplication
public class BackendApplication {

    public static void main(String[] args) {
        SpringApplication.run(BackendApplication.class, args);
    }


    @Bean
    CommandLineRunner initData(PersonRepository repo, MealRepository mealRepository) {
        return args -> {
            repo.saveAll(List.of(
                    new Person("Alice", Collections.emptySet(), Collections.emptySet()),
                    new Person("Bob", Collections.emptySet(), Collections.emptySet()),
                    new Person("Charlie", Collections.emptySet(), Collections.emptySet())
            ));
            mealRepository.saveAll(List.of(
                    new Meal("Pizza", MealTime.DINNER, LocalDate.now()),
                    new Meal("Porridge", MealTime.BREAKFAST, LocalDate.now())
            ));
        };
    }


}
