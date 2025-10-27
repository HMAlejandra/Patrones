package com.museo.backend.service;

import com.museo.backend.model.Artwork;
import com.museo.backend.repository.ArtworkRepository;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class ArtworkService {

    private final ArtworkRepository repo;

    public ArtworkService(ArtworkRepository repo) {
        this.repo = repo;
    }

    public Optional<Artwork> findById(String id) {
        return repo.findById(id);
    }

    public Artwork save(Artwork a) {
        return repo.save(a);
    }
}
