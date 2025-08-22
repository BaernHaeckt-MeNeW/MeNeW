package ch.bernhackt.menew.backend.controller;

import ch.bernhackt.menew.backend.dto.PersonDTO;
import ch.bernhackt.menew.backend.service.PersonService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

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
}
