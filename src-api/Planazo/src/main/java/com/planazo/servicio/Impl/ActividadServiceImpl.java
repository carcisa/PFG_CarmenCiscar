package com.planazo.servicio.Impl;


import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.planazo.entidad.Actividad;
import com.planazo.entidad.Comentario;
import com.planazo.repositorio.ActividadRepositorio;
import com.planazo.servicio.ActividadServicio;

@Service
public class ActividadServiceImpl implements ActividadServicio {

    private final ActividadRepositorio actividadRepository;

   
    public ActividadServiceImpl(ActividadRepositorio actividadRepository) {
        this.actividadRepository = actividadRepository;
    }

    @Override
    public List<Actividad> findAll() {
        return actividadRepository.findAll();
    }

    @Override
    public Optional<Actividad> findById(Integer id) {
        return actividadRepository.findById(id);
    }

    @Override
    public void deleteById(Integer id) {
        actividadRepository.deleteById(id);
    }

	@Override
	public Actividad save(Actividad actividad) {
		return actividadRepository.save(actividad);
	}


	 @Override
	    public Double getPuntuacionPromedioPorActividadId(Integer actividadId) {
	        Double promedio = actividadRepository.getPuntuacionPromedioPorActividadId(actividadId);
	        return promedio != null ? promedio : 0.0; 
	    }
	
	
}
