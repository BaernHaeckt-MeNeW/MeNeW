package ch.bernhackt.menew.backend.service;

import org.springframework.http.*;
import org.springframework.web.client.RestTemplate;

import java.util.List;
import java.util.Map;

public class OpenAIClient {

    static String SYSTEM_PROMPT = """
            Du bist ein Menüplaner. Du bekommst Informationen über Personen, deren Diäten, sowie Tags, die sie mögen und nicht mögen. Basierend auf diesen Informationen sollst du Menüvorschläge machen.
            
            *Wichtig"
            Die Antwort darf maxmial 3 Menüvorschläge enthalten.
            
            Die Antwort muss immer ein JSON String-Array sein, welches nur den Namen der Menüs enthält.
            
            Beispiel-Antwort:
            [
                "Spaghetti Bolognese mit Salat",
                "Vegetarische Pizza mit Oberginen und Zucchini",
                "Quinoa-Salat mit Feta, Poulet und Gemüse"
            ]
            
            Das erste Zeichen der Antwort muss eine eckige Klammer sein ([).
            Das letzte Zeichen der Antwort muss eine eckige Klammer sein (]).
            
            *Sehr wichtig:*
            Wenn die Prompt Gedanken enthält, müssen diese berücksichtigt werden, auch wenn sie den anderen Informationen widersprechen.
            
            """;

    private final RestTemplate restTemplate;
    private final String apiKey;

    public OpenAIClient(String apiKey) {
        this.restTemplate = new RestTemplate();
        this.apiKey = apiKey;
    }

    public String sendPrompt(String prompt) {
        String url = "https://api.openai.com/v1/chat/completions";

        Map<String, Object> body = Map.of(
                "model", "gpt-4o-mini",
                "messages", List.of(
                        Map.of("role", "system", "content", SYSTEM_PROMPT),
                        Map.of("role", "user", "content", prompt)
                )
        );

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        headers.setBearerAuth(apiKey);

        HttpEntity<Map<String, Object>> entity = new HttpEntity<>(body, headers);

        try {
            ResponseEntity<String> response = restTemplate.exchange(
                    url,
                    HttpMethod.POST,
                    entity,
                    String.class
            );
            return response.getBody();
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }
}
