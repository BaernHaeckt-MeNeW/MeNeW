package ch.bernhackt.menew.backend.respository;

import ch.bernhackt.menew.backend.entity.Person;
import org.springframework.data.jpa.repository.JpaRepository;


public interface PersonRepository extends JpaRepository<Person, Long> {
}