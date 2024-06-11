package com.planazo.servicio.Impl;


import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.planazo.entidad.Actividad;
import com.planazo.repositorio.ActividadRepositorio;
import com.planazo.servicio.ActividadServicio;

@Service
public class ActividadServiceImpl implements ActividadServicio {

    private final ActividadRepositorio actividadRepository;
    
    @Autowired
    private FileStorageService fileStorageService;

   
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
	 
	 @Override
	    public Actividad crearActividad(String actividadString, MultipartFile file) {
	        try {
	            ObjectMapper mapper = new ObjectMapper();
	            Actividad actividad = mapper.readValue(actividadString, Actividad.class);

	            String fileName = fileStorageService.storeFile(file);
	            actividad.setImagen(fileName);

	            return actividadRepository.save(actividad);
	        } catch (Exception e) {
	            throw new RuntimeException("Error creating activity", e);
	        }
	    }
	
}
