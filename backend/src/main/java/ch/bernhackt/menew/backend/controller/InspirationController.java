package ch.bernhackt.menew.backend.controller;

import ch.bernhackt.menew.backend.dto.GetInspirationDTO;
import ch.bernhackt.menew.backend.dto.InspirationDTO;
import ch.bernhackt.menew.backend.service.InspirationService;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/inspiration")
public class InspirationController {
    public final InspirationService inspirationService;

    public InspirationController(InspirationService inspirationService) {
        this.inspirationService = inspirationService;
    }

    @PostMapping
    public InspirationDTO getInspiration(@RequestBody GetInspirationDTO dto) {
        return inspirationService.getInspiration(dto.questionsAndAnswers(), dto.mealType(), dto.lastInspirations());
    }
}
