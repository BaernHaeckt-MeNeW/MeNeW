package ch.bernhackt.menew.backend.controller;

import ch.bernhackt.menew.backend.dto.PersonDTO;
import ch.bernhackt.menew.backend.service.PersonService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/persons")
public class PersonRestController {

    private final PersonService service;

    public PersonRestController(PersonService service) {
        this.service = service;
    }

    @GetMapping
    public List<PersonDTO> listPersons() {
        return service.listAll();
    }

    @DeleteMapping
    public void deletePerson(@RequestParam("id") Long id) throws RuntimeException {
        service.delete(id);
    }

   @PostMapping
    public PersonDTO createPerson(@RequestBody PersonDTO person) {
        return service.create(person);
    }
}




