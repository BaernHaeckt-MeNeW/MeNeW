package ch.bernhackt.menew.backend.service;

import com.openai.client.OpenAIClient;
import com.openai.client.okhttp.OpenAIOkHttpClient;
import com.openai.models.responses.ResponseCreateParams;
import com.openai.models.ChatModel;
import com.openai.models.responses.Response;
import org.springframework.stereotype.Service;

@Service
public class OpenAiService {

    private static final String SYSTEM_PROMPT = """
            You are an app that suggests menus based on information such as diets about person.
            - Answer with suggestions for a meal, based on the input you receive.
            """;

    private final OpenAIClient client = OpenAIOkHttpClient.fromEnv();

    public String prompt(String userPrompt) {
        ResponseCreateParams params = ResponseCreateParams.builder()
                .model(ChatModel.GPT_5_CHAT_LATEST)
                .instructions(SYSTEM_PROMPT)
                .input(userPrompt)
                .build();

        Response response = client.responses().create(params);

        // TODO: Handle response
        return "";
    }
}


