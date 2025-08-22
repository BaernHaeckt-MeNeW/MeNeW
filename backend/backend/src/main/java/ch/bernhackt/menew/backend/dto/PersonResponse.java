package ch.bernhackt.menew.backend.dto;

import ch.bernhackt.menew.backend.entity.Person;
import ch.bernhackt.menew.backend.entity.Diet;

import java.util.List;

public record PersonResponse(
        Long id,
        String name,
        Long householdId,
        String householdName,
        List<String> diets,
        List<TagResponse> tags
) {

    public static PersonResponse fromEntity(Person person) {
        return new PersonResponse(
                person.getId(),
                person.getName(),
                person.getHousehold().getId(),
                person.getHousehold().getName(),
                person.getDiets().stream().map(Diet::getLabel).toList(),
                person.getTags().stream().map(TagResponse::fromEntity).toList()
        );
    }
}