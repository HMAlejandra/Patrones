package com.museo.backend.controller;

import com.museo.backend.model.Artwork;
import com.museo.backend.service.ArtworkService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/artwork")
@CrossOrigin(origins = "*")
public class ArtworkController {

    private final ArtworkService svc;

    public ArtworkController(ArtworkService svc) {
        this.svc = svc;
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getArtwork(@PathVariable String id) {
        return svc.findById(id).map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<Artwork> createOrUpdate(@RequestBody Artwork artwork) {
        Artwork saved = svc.save(artwork);
        return ResponseEntity.ok(saved);
    }
}
