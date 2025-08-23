package ch.bernhackt.menew.backend.controller;

import ch.bernhackt.menew.backend.dto.GetInspirationDTO;
import ch.bernhackt.menew.backend.dto.InspirationDTO;
import ch.bernhackt.menew.backend.service.InspirationService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/inspiration")
public class InspirationController {
    public final InspirationService inspirationService;

    public InspirationController(InspirationService inspirationService) {
        this.inspirationService = inspirationService;
    }

    @GetMapping
    public InspirationDTO getInspiration(GetInspirationDTO dto) {
        return inspirationService.getInspiration(dto.questionsAndAnswers());
    }
}
