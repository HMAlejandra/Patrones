package com.museo.backend.service;

import com.museo.backend.model.Cuadro;
import com.museo.backend.repository.CuadroRepository;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
public class CuadroService {

    private final CuadroRepository cuadroRepository;

    public CuadroService(CuadroRepository cuadroRepository) {
        this.cuadroRepository = cuadroRepository;
    }

    public Optional<Cuadro> obtenerPorId(Long id) {
        return cuadroRepository.findById(id);
    }

    public List<Cuadro> listarTodos() {
        return cuadroRepository.findAll();
    }

    public Cuadro guardar(Cuadro cuadro) {
        return cuadroRepository.save(cuadro);
    }

    public void eliminar(Long id) {
        cuadroRepository.deleteById(id);
    }
}