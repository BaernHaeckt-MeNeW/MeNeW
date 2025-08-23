package ch.bernhackt.menew.backend.controller;

import ch.bernhackt.menew.backend.dto.DietDTO;
import ch.bernhackt.menew.backend.service.DietService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/diets")
public class DietRestController {

    public final DietService dietService;

    public DietRestController(DietService dietService) {
        this.dietService = dietService;
    }

    @GetMapping
    public List<DietDTO> listDiets() {
        return dietService.listAll();
    }
}
