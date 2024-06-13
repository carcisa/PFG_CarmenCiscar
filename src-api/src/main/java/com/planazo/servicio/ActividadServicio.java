package com.planazo.servicio;

import java.util.List;
import java.util.Optional;

import org.springframework.web.multipart.MultipartFile;

import com.planazo.entidad.Actividad;

public interface ActividadServicio {
	
	
	List<Actividad> findAll();

	Optional<Actividad> findById(Integer id);

	Actividad save(Actividad actividad);

	void deleteById(Integer id);
	
	Double getPuntuacionPromedioPorActividadId(Integer actividadId);
	
	Actividad crearActividad(String actividadString, MultipartFile file);
	
	
}
