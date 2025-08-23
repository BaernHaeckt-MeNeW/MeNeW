package ch.bernhackt.menew.backend.service;

import ch.bernhackt.menew.backend.entity.Diet;
import ch.bernhackt.menew.backend.respository.DietRepository;
import org.springframework.stereotype.Service;

@Service
public class DietService {

    private final DietRepository dietRepository;

    public DietService(DietRepository dietRepository) {
        this.dietRepository = dietRepository;
    }
    public Diet save(Diet diet) {
        return dietRepository.save(diet);
    }




}
