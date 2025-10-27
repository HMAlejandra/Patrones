package com.museo.backend.model;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

@Entity
@Table(name="artwork")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Artwork implements Cloneable {
    @Id
    private String id; // e.g., "obra_01"
    private String title;
    private String artist;
    @Column(length = 2000)
    private String description;
    private String imageUrl;
    private String type; // image, model3d, audio

    @Override
    public Artwork clone() {
        try {
            return (Artwork) super.clone();
        } catch (CloneNotSupportedException e) {
            throw new RuntimeException(e);
        }
    }
}
