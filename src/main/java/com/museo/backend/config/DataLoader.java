package com.museo.backend.config;

import com.museo.backend.model.Artwork;
import com.museo.backend.repository.ArtworkRepository;
import jakarta.annotation.PostConstruct;
import org.springframework.stereotype.Component;

@Component
public class DataLoader {

    private final ArtworkRepository repo;

    public DataLoader(ArtworkRepository repo) {
        this.repo = repo;
    }

    @PostConstruct
    public void load() {
        if (repo.count() == 0) {
            Artwork a1 = new Artwork("obra_01","La Gioconda","Leonardo da Vinci",
                    "Retrato de Lisa Gherardini, más conocida como Mona Lisa.","https://upload.wikimedia.org/wikipedia/commons/6/6a/Mona_Lisa.jpg","image");
            Artwork a2 = new Artwork("obra_02","Las Meninas","Diego Velázquez",
                    "Pintura barroca que muestra a la infanta Margarita rodeada de su séquito.","https://upload.wikimedia.org/wikipedia/commons/6/6f/Las_Meninas_01.jpg","image");
            repo.save(a1);
            repo.save(a2);
        }
    }
}
