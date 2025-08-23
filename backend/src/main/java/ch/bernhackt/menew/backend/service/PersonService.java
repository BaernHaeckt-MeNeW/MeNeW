package ch.bernhackt.menew.backend.service;


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

    public PersonDTO create(PersonDTO dto) {
        if (dto.id() != null && personRepository.findById(dto.id()).isPresent()) {
            throw new IllegalStateException("Person with id " + dto.id() + " already exists");
        }

        Person personCreated = new Person();
        personCreated.setName(dto.name());

        /*
         * === Diets ===
         * Resolve diets from the DTO:
         * - if an ID is present, fetch the diet entry
         * - if only name is present, lookup or create new diet if not found by name
         */

        Set<Diet> diets = dto.diets() == null ? Set.of() : dto.diets().stream()
                .map(d -> {
                    if (d.id() != null) {
                        return dietRepository.findById(d.id())
                                .orElseThrow(() -> new IllegalArgumentException("Diet with id " + d.id() + " doesn't exist"));
                    }
                    String name = d.name();
                    return dietRepository.findByName(name)
                            .orElseGet(() -> dietRepository.save(new Diet(name)));
                })
                .collect(Collectors.toCollection(LinkedHashSet::new));

        personCreated.setDiets(diets);

        /*
         * === Tags ===
         * Resolve tags from the DTO:
         * - if an ID is present, fetch the existing Tag entity
         * - if name + category are provided, lookup or create a new Tag if not found
         */
        Set<Tag> tags = dto.tags() == null ? Set.of() :
                dto.tags().stream()
                        .map(t -> {
                            if (t.id() != null) {
                                return tagRepository.findById(t.id())
                                        .orElseThrow(() -> new IllegalArgumentException("Tag with id " + t.id() + " doesn't exist"));
                            }
                            String name = t.name();
                            if (name == null || name.isBlank()) {
                                throw new IllegalArgumentException("Tag must not be blank");
                            }
                            TagCategory category;
                            try {
                                category = t.categoryName() == null ? null : TagCategory.valueOf(t.categoryName());
                            } catch (IllegalArgumentException e) {
                                throw new IllegalArgumentException("Tag category '" + t.categoryName() + "' is invalid");
                            }
                            if (category == null) {
                                throw new IllegalArgumentException("Tag category is required");
                            }
                            return tagRepository.findByNameAndCategory(name, category)
                                    .orElseGet(() -> {
                                        Tag newTag = new Tag();
                                        newTag.setName(name);
                                        newTag.setCategory(category);
                                        return tagRepository.save(newTag);
                                    });
                        })
                        .collect(Collectors.toCollection(LinkedHashSet::new));

        personCreated.setTags(tags);

        Person personSaved = personRepository.save(personCreated);
        return PersonDTO.fromEntity(personSaved);
    }

}
