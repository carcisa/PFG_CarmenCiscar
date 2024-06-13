package com.planazo.servicio;

import java.util.List;
import java.util.Optional;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;

import com.planazo.entidad.Destino;

import jakarta.validation.Valid;

public interface DestinoServicio {

	List<Destino> findAll();

	Optional<Destino> findById(Integer id);

	Destino save(Destino destino);

	void deleteById(Integer id);
	
	Optional<Destino> findByNombre(String nombre);
	
}
