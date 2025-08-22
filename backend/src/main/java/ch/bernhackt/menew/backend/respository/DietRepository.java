package ch.bernhackt.menew.backend.respository;

import ch.bernhackt.menew.backend.entity.Diet;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface DietRepository extends JpaRepository<Diet, Long> {
    Optional<Diet> findBySlug(String slug);
}