package ch.bernhackt.menew.backend;

import ch.bernhackt.menew.backend.entity.*;
import ch.bernhackt.menew.backend.respository.DietRepository;
import ch.bernhackt.menew.backend.respository.MealRepository;
import ch.bernhackt.menew.backend.respository.PersonRepository;
import ch.bernhackt.menew.backend.respository.TagRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Random;
import java.util.Set;


@SpringBootApplication
public class BackendApplication {

    public static void main(String[] args) {
        SpringApplication.run(BackendApplication.class, args);
    }

    @Bean
    CommandLineRunner initData(PersonRepository repo, MealRepository mealRepository, DietRepository dietRepository, TagRepository tagRepository) {
        return args -> {
            Diet veg = new Diet("Vegetarisch");
            Diet halal = new Diet("Halal");
            Tag tag1 = new Tag(TagCategory.NOGO, "Mag keinen Fisch", LocalDateTime.now());
            Tag tag2 = new Tag(TagCategory.NOGO, "Zu viel Fleisch", LocalDateTime.now());
            dietRepository.saveAll(List.of(veg, halal));
            tagRepository.saveAll(List.of(tag1, tag2));
            repo.save(new Person("Hans", Set.of(veg), Set.of(tag1)));
            repo.save(new Person("Severin", Set.of(halal), Set.of(tag2)));

            Random random = new Random();

            LocalDate start = LocalDate.now().minusWeeks(1);
            LocalDate end = LocalDate.now().plusWeeks(2);

            List<Meal> meals = new ArrayList<>();

            List<String> breakfastOptions = List.of("Porridge", "Pancakes", "Rührei", "Smoothie");
            List<String> lunchOptions = List.of("Salat", "Sandwich", "Sushi", "Curry");
            List<String> dinnerOptions = List.of("Pad Thai", "Pizza", "Lasagne", "Burrito");

            final double P_BREAKFAST = 0.85;
            final double P_LUNCH     = 0.75;
            final double P_DINNER    = 0.65;

            for (LocalDate date = start; !date.isAfter(end); date = date.plusDays(1)) {

                int count = 1 + random.nextInt(4);

                if (random.nextDouble() < P_BREAKFAST) {
                    meals.add(new Meal(
                            breakfastOptions.get(random.nextInt(breakfastOptions.size())),
                            MealTime.BREAKFAST,
                            date
                    ));
                }
                if (count > 1) {
                    if (random.nextDouble() < P_LUNCH) {
                        meals.add(new Meal(
                                lunchOptions.get(random.nextInt(lunchOptions.size())),
                                MealTime.LUNCH,
                                date
                        ));
                    }
                }
                if (count > 2) {
                    if (random.nextDouble() < P_DINNER) {
                        meals.add(new Meal(
                                dinnerOptions.get(random.nextInt(dinnerOptions.size())),
                                MealTime.DINNER,
                                date
                        ));
                    }
                }
            }

            mealRepository.saveAll(meals);
        };
    }



}
