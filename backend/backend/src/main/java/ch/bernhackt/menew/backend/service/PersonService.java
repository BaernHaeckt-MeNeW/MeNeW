package ch.bernhackt.menew.backend.service;


import ch.bernhackt.menew.backend.dto.PersonResponse;
import ch.bernhackt.menew.backend.respository.PersonRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PersonService {

    private final PersonRepository repo;

    public PersonService(PersonRepository repo) {
        this.repo = repo;
    }

    public List<PersonResponse> listAll() {
        return repo.findAll().stream()
                .map(PersonResponse::fromEntity)
                .toList();
    }
}
