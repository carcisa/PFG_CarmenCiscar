package com.planazo.servicio;

import java.util.List;
import java.util.Optional;

import com.planazo.entidad.Actividad;

public interface ActividadServicio {
	
	
	List<Actividad> findAll();

	Optional<Actividad> findById(Integer id);

	Actividad save(Actividad actividad);

	void deleteById(Integer id);
	
	Double getPuntuacionPromedioPorActividadId(Integer actividadId);
	
	
}
