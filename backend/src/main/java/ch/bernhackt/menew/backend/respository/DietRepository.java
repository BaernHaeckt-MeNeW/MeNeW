package ch.bernhackt.menew.backend.respository;

import ch.bernhackt.menew.backend.entity.Diet;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Collection;
import java.util.List;
import java.util.Optional;

@Repository
public interface DietRepository extends JpaRepository<Diet, Long> {
    Optional<Diet> findByName(String name);
}
