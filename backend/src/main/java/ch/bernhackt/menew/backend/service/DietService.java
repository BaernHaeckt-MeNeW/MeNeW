package ch.bernhackt.menew.backend.service;

import ch.bernhackt.menew.backend.dto.DietDTO;
import ch.bernhackt.menew.backend.entity.Diet;
import ch.bernhackt.menew.backend.respository.DietRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class DietService {

    private final DietRepository dietRepository;

    public DietService(DietRepository dietRepository) {
        this.dietRepository = dietRepository;
    }

    public Diet save(Diet diet) {
        return dietRepository.save(diet);
    }

    public List<DietDTO> listAll() {
        return dietRepository.findAll().stream().map(DietDTO::fromEntity)
                .toList();
    }
}
