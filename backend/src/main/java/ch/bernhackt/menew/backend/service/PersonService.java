package ch.bernhackt.menew.backend.service;


import ch.bernhackt.menew.backend.dto.CreatePersonDTO;
import ch.bernhackt.menew.backend.dto.PersonDTO;
import ch.bernhackt.menew.backend.entity.Diet;
import ch.bernhackt.menew.backend.entity.Person;
import ch.bernhackt.menew.backend.entity.Tag;
import ch.bernhackt.menew.backend.entity.TagCategory;
import ch.bernhackt.menew.backend.respository.DietRepository;
import ch.bernhackt.menew.backend.respository.PersonRepository;
import ch.bernhackt.menew.backend.respository.TagRepository;
import org.springframework.jdbc.core.namedparam.NamedParameterJdbcTemplate;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.stream.Collectors;

@Service
public class PersonService {

    private final PersonRepository personRepository;
    private final DietRepository dietRepository;
    private final TagRepository tagRepository;

    public PersonService(PersonRepository personRepository, DietRepository dietRepository, TagRepository tagRepository) {
        this.personRepository = personRepository;
        this.dietRepository = dietRepository;
        this.tagRepository = tagRepository;
    }

    public List<PersonDTO> listAll() {
        return personRepository.findAll().stream()
                .map(PersonDTO::fromEntity)
                .toList();
    }

    public void delete(Long id) {
        Optional<Person> person = personRepository.findById(id);
        if (person.isPresent()) {
            personRepository.deleteById(id);
        } else {
            throw new RuntimeException("Person with id " + id + "doesn't exist");
        }
    }

    public PersonDTO create(CreatePersonDTO dto) {
        Person person = new Person();
        person.setName(dto.name());

        Set<Diet> diets = resolveDiets(dto.diets());
        person.setDiets(diets);

        Set<Tag> tags = new HashSet<>();
        tags.addAll(createAndSaveTags(dto.gos(), TagCategory.GO));
        tags.addAll(createAndSaveTags(dto.noGos(), TagCategory.NOGO));
        person.setTags(tags);

        Person saved = personRepository.save(person);
        return PersonDTO.fromEntity(saved);
    }

    private Set<Diet> resolveDiets(Long[] dietIds) {
        if (dietIds == null || dietIds.length == 0) return Collections.emptySet();

        Set<Long> ids = Arrays.stream(dietIds).filter(Objects::nonNull).collect(Collectors.toSet());
        if (ids.isEmpty()) return Collections.emptySet();

        List<Diet> found = dietRepository.findAllById(ids);
        if (found.size() != ids.size()) {
            Set<Long> foundIds = found.stream().map(Diet::getId).collect(Collectors.toSet());
            Set<Long> missing = new HashSet<>(ids);
            missing.removeAll(foundIds);
            throw new RuntimeException("Diet no found: " + missing);
        }
        return new HashSet<>(found);
    }

    private Set<Tag> createAndSaveTags(String[] names, TagCategory category) {
        if (names == null || names.length == 0) return Collections.emptySet();

        List<Tag> toSave = Arrays.stream(names)
                .filter(Objects::nonNull)
                .map(String::trim)
                .filter(s -> !s.isEmpty())
                .distinct()
                .map(n -> {
                    Tag t = new Tag();
                    t.setName(n);
                    t.setCategory(category);
                    return t;
                })
                .toList();

        if (toSave.isEmpty()) return Collections.emptySet();

        return new HashSet<>(tagRepository.saveAll(toSave));
    }

}
