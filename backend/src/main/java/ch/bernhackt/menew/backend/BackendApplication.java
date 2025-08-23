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
            mealRepository.saveAll(List.of(
                    new Meal("Porridge", MealTime.BREAKFAST, LocalDate.now()),
                    new Meal("Pad Thai", MealTime.DINNER, LocalDate.now())
            ));
        };
    }


}
