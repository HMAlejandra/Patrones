package com.museo.backend.repository;
import com.museo.backend.model.Cuadro;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CuadroRepository extends JpaRepository<Cuadro, Long> {
}
