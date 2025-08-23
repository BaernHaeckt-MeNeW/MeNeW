package ch.bernhackt.menew.backend.controller;

import ch.bernhackt.menew.backend.dto.PersonDTO;
import ch.bernhackt.menew.backend.service.PersonService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/api/persons")
public class PersonRestController {

    private final PersonService personService;
    public PersonRestController(PersonService personService) {
        this.personService = personService;
    }

    @GetMapping
    public List<PersonDTO> listPersons() {
        return personService.listAll();
    }

    @DeleteMapping
    public void deletePerson(@RequestParam("id") Long id) throws RuntimeException {
        personService.delete(id);
    }

    @PostMapping
    public PersonDTO createPerson(@RequestBody PersonDTO person) {
        return personService.create(person);
    }
}




