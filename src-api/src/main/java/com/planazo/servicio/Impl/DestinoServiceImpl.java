package com.planazo.servicio.Impl;


import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.planazo.entidad.Destino;
import com.planazo.repositorio.DestinoRepositorio;
import com.planazo.servicio.DestinoServicio;

@Service
public class DestinoServiceImpl implements DestinoServicio {

    private final DestinoRepositorio destinoRepository;


    public DestinoServiceImpl(DestinoRepositorio destinoRepository) {
        this.destinoRepository = destinoRepository;
    }

    @Override
    public List<Destino> findAll() {
        return destinoRepository.findAll();
    }

    @Override
    public Optional<Destino> findById(Integer id) {
        return destinoRepository.findById(id);
    }


    public void deleteById(Integer id) {
        destinoRepository.deleteById(id);
    }

	@Override
	public Destino save(Destino destino) {
		return destinoRepository.save(destino);
	}

	@Override
	public Optional<Destino> findByNombre(String nombre) {
		return destinoRepository.findByNombre(nombre);
	}

	
}
