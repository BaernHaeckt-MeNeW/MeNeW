package ch.bernhackt.menew.backend.service;


import ch.bernhackt.menew.backend.dto.PersonDTO;
import ch.bernhackt.menew.backend.entity.Diet;
import ch.bernhackt.menew.backend.entity.Person;
import ch.bernhackt.menew.backend.entity.Tag;
import ch.bernhackt.menew.backend.respository.DietRepository;
import ch.bernhackt.menew.backend.respository.PersonRepository;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.Set;

@Service
public class PersonService {

    private final PersonRepository repo;
    private final DietRepository dietRepository;

    public PersonService(PersonRepository repo, DietRepository dietRepository) {
        this.repo = repo;
        this.dietRepository = dietRepository;
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

    public void create(PersonDTO dto) {
        Optional<Person> person = repo.findById(dto.id());
        if (person.isPresent()) {
            throw new RuntimeException("Person with id " + dto.id() + " already exists");
        } else {

           /* Set<Diet> diets = new HashSet<>(dietRepository.findAllByNameIn(dto.diets()));
            Set<Tag> tags = new HashSet<>(tagRepository.findAll);

            Person createdPerson = new Person(dto.name(),
*/
        }
    }

}
