package ch.bernhackt.menew.backend.dto;

public record CreatePersonDTO(
        String name,
        Long[] diets,
        String[] gos,
        String[] noGos
) {
}
