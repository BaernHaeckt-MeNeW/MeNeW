package ch.bernhackt.menew.backend.dto;

import ch.bernhackt.menew.backend.entity.Person;

import java.util.List;

public record PersonDTO(
        Long id,
        String name,
        List<DietDTO> diets,
        List<TagDTO> tags
) {
    public static PersonDTO fromEntity(Person person) {
        return new PersonDTO(
                person.getId(),
                person.getName(),
                person.getDiets().stream().map(DietDTO::fromEntity).toList(),
                person.getTags().stream().map(TagDTO::fromEntity).toList()
        );
    }
}