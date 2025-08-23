package ch.bernhackt.menew.backend.respository;

import ch.bernhackt.menew.backend.entity.Tag;
import ch.bernhackt.menew.backend.entity.TagCategory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


import java.util.Optional;

@Repository
public interface TagRepository extends JpaRepository<Tag, Long> {

    Optional<Tag> findByNameAndCategory(String name, TagCategory category);
}
