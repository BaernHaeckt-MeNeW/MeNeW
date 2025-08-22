package ch.bernhackt.menew.backend.config;

import ch.bernhackt.menew.backend.entity.Diet;
import ch.bernhackt.menew.backend.respository.DietRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class DietDataLoader implements CommandLineRunner {

    private final DietRepository dietRepository;

    public DietDataLoader(DietRepository dietRepository) {
        this.dietRepository = dietRepository;
    }

    @Override
    public void run(String... args) {
        List<Diet> defaults = List.of(
                new Diet("vegetarisch", "Vegetarisch"),
                new Diet("vegan", "Vegan"),
                new Diet("laktosefrei", "Laktosefrei"),
                new Diet("glutenfrei", "Glutenfrei")
        );

        for (Diet d : defaults) {
            dietRepository.findBySlug(d.getSlug())
                    .orElseGet(() -> dietRepository.save(d));
        }
    }
}