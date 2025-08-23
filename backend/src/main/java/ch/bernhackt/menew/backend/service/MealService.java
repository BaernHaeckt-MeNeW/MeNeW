package ch.bernhackt.menew.backend.service;


import ch.bernhackt.menew.backend.dto.MealDTO;
import ch.bernhackt.menew.backend.entity.*;
import ch.bernhackt.menew.backend.respository.MealRepository;

import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class MealService {

    private final MealRepository mealRepository;

    public MealService(MealRepository mealRepository) {
        this.mealRepository = mealRepository;
    }

    public List<MealDTO> listAll() {
        return mealRepository.findAll().stream()
                .map(MealDTO::fromEntity)
                .toList();
    }

    public void delete(Long id) {
        Optional<Meal> meal = mealRepository.findById(id);
        if (meal.isPresent()) {
            mealRepository.deleteById(id);
        } else {
            throw new RuntimeException("Meal with id " + id + "doesn't exist");
        }
    }


    public MealDTO create(MealDTO dto) {
        if (dto.id() != null && mealRepository.findById(dto.id()).isPresent()) {
            throw new IllegalStateException("Meal with id " + dto.id() + " already exists");
        }

        Meal mealCreated = new Meal();
        mealCreated.setName(dto.name());

        Meal mealSaved = mealRepository.save(mealCreated);
        return MealDTO.fromEntity(mealSaved);
    }

}
