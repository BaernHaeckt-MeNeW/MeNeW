package ch.bernhackt.menew.backend.dto;

import ch.bernhackt.menew.backend.entity.Person;
import ch.bernhackt.menew.backend.entity.Diet;

import java.util.List;

public record PersonDTO(
        Long id,
        String name,
        List<String> diets,
        List<TagDTO> tags
) {

    public static PersonDTO fromEntity(Person person) {
        return new PersonDTO(
                person.getId(),
                person.getName(),
                person.getDiets().stream().map(Diet::getLabel).toList(),
                person.getTags().stream().map(TagDTO::fromEntity).toList()
        );
    }
}