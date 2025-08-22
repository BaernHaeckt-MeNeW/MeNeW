package ch.bernhackt.menew.backend.dto;

import ch.bernhackt.menew.backend.entity.Tag;

public record TagResponse(
        Long id,
        String name,
        String slug,
        String categorySlug,
        String categoryName
) {
    public static TagResponse fromEntity(Tag tag) {
        return new TagResponse(
                tag.getId(),
                tag.getName(),
                tag.getSlug(),
                tag.getCategory().getSlug(),
                tag.getCategory().getName()
        );
    }
}