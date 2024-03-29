package com.planazo.repositorio;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.planazo.entidad.Actividad;


@Repository
public interface ActividadRepositorio extends JpaRepository<Actividad, Integer> {
	
}
