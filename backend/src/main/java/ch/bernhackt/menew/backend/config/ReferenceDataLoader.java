package ch.bernhackt.menew.backend.config;

import ch.bernhackt.menew.backend.entity.Diet;
import ch.bernhackt.menew.backend.respository.DietRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class ReferenceDataLoader implements CommandLineRunner {

    private final DietRepository dietRepository;

    public ReferenceDataLoader(DietRepository dietRepository) {
        this.dietRepository = dietRepository;
    }

    @Override
    public void run(String... args) {
       addDiets();
    }

    private void addDiets() {
        List<Diet> defaults = List.of(
                new Diet("vegetarisch"),
                new Diet("vegan"),
                new Diet("laktosefrei"),
                new Diet("glutenfrei")
        );

        for (Diet d : defaults) {
            dietRepository.findByName(d.getName()).orElse(dietRepository.save(d));
        }
    }
}