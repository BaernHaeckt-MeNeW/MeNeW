package ch.bernhackt.menew.backend.dto;

import ch.bernhackt.menew.backend.entity.Diet;

public record DietDTO(
        Long id,
        String name
) {
    public static DietDTO fromEntity(Diet diet) {
        return new DietDTO(
                diet.getId(),
                diet.getName()
        );
    }
}

