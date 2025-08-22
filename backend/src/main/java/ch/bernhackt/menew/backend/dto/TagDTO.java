package ch.bernhackt.menew.backend.dto;

import ch.bernhackt.menew.backend.entity.Tag;

public record TagDTO(
        Long id,
        String name,
        String categoryName
) {
    public static TagDTO fromEntity(Tag tag) {
        return new TagDTO(
                tag.getId(),
                tag.getName(),
                tag.getCategory().name()
        );
    }
}