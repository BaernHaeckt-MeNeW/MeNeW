package ch.bernhackt.menew.backend.controller;

import ch.bernhackt.menew.backend.dto.MealDTO;
import ch.bernhackt.menew.backend.dto.PersonDTO;
import ch.bernhackt.menew.backend.service.MealService;
import ch.bernhackt.menew.backend.service.PersonService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/persons")
public class MealRestController {

    private final MealService mealService;

    public MealRestController(MealService mealService) {this.mealService = mealService;}

//    Meal
    @GetMapping
    public List<MealDTO> listMeals() {
        return mealService.listAll();
    }

    @DeleteMapping
    public void deleteMeal(@RequestParam("id") Long id) throws RuntimeException {
        mealService.delete(id);
    }

    @PostMapping
    public MealDTO createMeal(@RequestBody MealDTO meal) {
        return mealService.create(meal);
    }


}




