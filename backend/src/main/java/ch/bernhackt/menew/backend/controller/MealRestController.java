package ch.bernhackt.menew.backend.controller;

import ch.bernhackt.menew.backend.dto.MealDTO;
import ch.bernhackt.menew.backend.service.MealService;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/api/meals")
public class MealRestController {

    private final MealService mealService;

    public MealRestController(MealService mealService) {
        this.mealService = mealService;
    }

    //    Meal
    @GetMapping
    public List<MealDTO> listMeals(
            @RequestParam(required = false)
            @org.springframework.format.annotation.DateTimeFormat(iso = DateTimeFormat.ISO.DATE)
            LocalDate date
    ) {
        return mealService.list(date);
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




