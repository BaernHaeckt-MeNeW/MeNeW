package ch.bernhackt.menew.backend.service;

import ch.bernhackt.menew.backend.dto.InspirationDTO;
import ch.bernhackt.menew.backend.dto.QuestionAndAnswerDTO;
import ch.bernhackt.menew.backend.entity.Diet;
import ch.bernhackt.menew.backend.entity.MealTime;
import ch.bernhackt.menew.backend.entity.Tag;
import ch.bernhackt.menew.backend.entity.TagCategory;
import ch.bernhackt.menew.backend.respository.PersonRepository;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.core.env.Environment;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.Arrays;
import java.util.List;

import static java.util.stream.Collectors.toList;

@Service
public class InspirationService {

    private final PersonRepository personRepository;
    private final OpenAIClient client;

    public InspirationService(PersonRepository personRepository, Environment env) {
        var apiKey = env.getProperty("API_KEY");
        this.client = new OpenAIClient(apiKey);
        this.personRepository = personRepository;
    }

    public InspirationDTO getInspiration(QuestionAndAnswerDTO[] questionAndAnswerDTOS, MealTime mealTime, List<String> lastInspiration) {
        var persons = personRepository.findAll();
        var personsDiets = persons.stream()
                .flatMap(person -> person.getDiets().stream())
                .distinct()
                .toList();

        var noGoTags = persons.stream()
                .flatMap(person -> person.getTags().stream())
                .filter(tag -> tag.getCategory() == TagCategory.NOGO)
                .map(Tag::getName)
                .distinct()
                .toList();

        var goTags = persons.stream()
                .flatMap(person -> person.getTags().stream())
                .filter(tag -> tag.getCategory() == TagCategory.GO)
                .map(Tag::getName)
                .distinct()
                .toList();

        var questionsParsed = Arrays.stream(questionAndAnswerDTOS)
                .map(qa -> {
                    var question = qa.question();
                    var answer = qa.answer();
                    return question + "\n" + answer;
                })
                .collect(toList());

        var parsedString = String.join("\n\n", questionsParsed);


        var prompt = """
                Informationen über die Personen:
                Mahlzeit: %s
                
                Diäten:
                %s
                
                No Gos:
                %s
                
                Gos:
                %s
                
                Weitere Informationen in Form von Fragen und Antworten:
                
                %s
                
                
                Folgende Mahlzeiten oder ähnliche dürfen nicht vorgeschlagen werden, da sie in den letzten Inspirationen bereits vorgeschlagen wurden:
                %s
                
                """.formatted(
                mealTime,
                personsDiets.stream().map(Diet::getName).toList().toString(),
                noGoTags.stream().toList().toString(),
                goTags.stream().toList().toString(),
                lastInspiration == null || lastInspiration.isEmpty() ? "Keine" : lastInspiration.stream().map(tag -> "- " + tag).toList().toString(),
                parsedString
        );

        String json = this.client.sendPrompt(
                prompt
        );

        try {
            ObjectMapper mapper = new ObjectMapper();
            JsonNode root = mapper.readTree(json);

            String content = root.path("choices")
                    .get(0)
                    .path("message")
                    .path("content")
                    .asText();

            String[] ideas = mapper.readValue(content, String[].class);
            return new InspirationDTO(ideas);

        } catch (JsonProcessingException e) {
            throw new RuntimeException(e);
        }
    }
}

