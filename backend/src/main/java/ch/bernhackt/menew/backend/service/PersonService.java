package ch.bernhackt.menew.backend.service;


import ch.bernhackt.menew.backend.dto.PersonDTO;
import ch.bernhackt.menew.backend.entity.Person;
import ch.bernhackt.menew.backend.respository.PersonRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class PersonService {

    private final PersonRepository repo;

    public PersonService(PersonRepository repo) {
        this.repo = repo;
    }

    public List<PersonDTO> listAll() {
        return repo.findAll().stream()
                .map(PersonDTO::fromEntity)
                .toList();
    }

    public void delete(Long id) {
        Optional<Person> person = repo.findById(id);
        if (person.isPresent()) {
            repo.deleteById(id);
        } else {
            throw new RuntimeException("Person with id " + id + "doesn't exist");
        }
    }
}
