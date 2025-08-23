package ch.bernhackt.menew.backend.controller;

import ch.bernhackt.menew.backend.dto.AiRequestDTO;
import ch.bernhackt.menew.backend.dto.MealDTO;
import ch.bernhackt.menew.backend.service.OpenAiService;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/api/ai")
public class OpenAiRequestController {

    private final OpenAiService openAiService;

    public OpenAiRequestController(OpenAiService openAiService) {
        this.openAiService = openAiService;
    }

    @PostMapping
    public AiResponseDTO createMeal(@RequestBody AiRequestDTO aiRequest) {
        return openAiService.request(aiRequest);
    }


}




