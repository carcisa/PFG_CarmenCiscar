package com.planazo.controlador;

import java.io.File;
import java.io.IOException;
import java.net.URL;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.http.HttpStatus;


import org.apache.commons.io.FileUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.planazo.entidad.Actividad;
import com.planazo.entidad.Destino;
import com.planazo.error.actividad.ActividadNoEncontradaException;
import com.planazo.error.actividad.ListaActividadesVaciaException;
import com.planazo.repositorio.ActividadRepositorio;
import com.planazo.repositorio.DestinoRepositorio;
import com.planazo.servicio.ActividadServicio;
import com.planazo.servicio.DestinoServicio;
import com.planazo.servicio.Impl.FileStorageService;

import jakarta.transaction.Transactional;
import jakarta.validation.Valid;

/**
 * Controlador REST para gestionar actividades. Proporciona endpoints para
 * operaciones CRUD sobre actividades.
 */
@RestController
@RequestMapping("/api/actividades")
public class ActividadControlador {
	
    private static final Logger logger = LoggerFactory.getLogger(ActividadControlador.class);
	
	

	private final ActividadServicio actividadService;

	@Autowired
	private DestinoServicio destinoService;
	
	@Autowired
	private DestinoRepositorio destinoRepositorio;
	
	@Autowired
	private ActividadRepositorio actividadRepositorio;
	
	 @Autowired
	 private FileStorageService fileStorageService;
	 
	 @Autowired
	 private final ObjectMapper objectMapper = new ObjectMapper();

	/**
	 * Constructor para inyectar el servicio de actividades.
	 * 
	 * @param actividadService El servicio que gestiona las operaciones sobre
	 *                         actividades.
	 */
	public ActividadControlador(ActividadServicio actividadService) {
		this.actividadService = actividadService;
	}

	/**
	 * Obtiene todas las actividades disponibles.
	 * 
	 * @return Una lista de actividades.
	 */
	@GetMapping
	@Transactional
	public List<Actividad> getAllActividades() {
		List<Actividad> actividades = actividadService.findAll();
		if (actividades.isEmpty()) {
			throw new ListaActividadesVaciaException("El listado de atraciones está vacío");
		}
		return actividadService.findAll();
	}

	/**
	 * Obtiene una actividad por su identificador.
	 * 
	 * @param id El identificador único de la actividad.
	 * @return ResponseEntity con la actividad si se encuentra, o no encontrado
	 *         (404) si no se encuentra.
	 */
	@GetMapping("/{id}")
	public ResponseEntity<Actividad> getActividadById(@PathVariable Integer id) {
		return actividadService.findById(id).map(ResponseEntity::ok)
				.orElseThrow(() ->  new ActividadNoEncontradaException("La actividad no existe" + id));
	}

	/**
	 * Crea una nueva actividad.
	 * 
	 * @param actividad Los detalles de la actividad a crear.
	 * @return La actividad creada.
	 */
//	@PostMapping
//	public Actividad createActividad(@Valid @RequestBody Actividad actividad) {
//		return actividadService.save(actividad);
//	}
	
	@PostMapping(consumes = "multipart/form-data")
	    public Actividad crearActividad(@RequestParam("actividad") String actividadString,
	                                    @RequestParam("file") MultipartFile file) {
	        return actividadService.crearActividad(actividadString, file);
	    }
	
	
	/**
	 * Actualiza una actividad existente.
	 * 
	 * @param id               El identificador único de la actividad a actualizar.
	 * @param actividadDetails Los nuevos detalles de la actividad.
	 * @return ResponseEntity con la actividad actualizada si se encuentra, o no
	 *         encontrado (404) si no se encuentra.
	 */
//	@PutMapping("/{id}")
//	public ResponseEntity<Actividad> updateActividad(@Valid @PathVariable Integer id,
//			@RequestBody Actividad actividadDetails) {
//		return actividadService.findById(id).map(actividad -> {
//			actividad.setNombre(actividadDetails.getNombre());
//			actividad.setDescripcion(actividadDetails.getDescripcion());
//			actividad.setCategoria(actividadDetails.getCategoria());
//			actividad.setDireccion(actividadDetails.getDireccion());
//			Actividad updatedActividad = actividadService.save(actividad);
//			return ResponseEntity.ok(updatedActividad);
//		}).orElseGet(() -> ResponseEntity.notFound().build());
//	}
	
	@PutMapping(path = "/{id}", consumes = "multipart/form-data")
	public ResponseEntity<?> updateActividad(@PathVariable Integer id,
	                                         @RequestParam("actividad") String actividadString,
	                                         @RequestParam(value = "file", required = false) MultipartFile file) {
	    return actividadService.findById(id).map(existingActividad -> {
	        try {
	            Actividad actividad = objectMapper.readValue(actividadString, Actividad.class);

	            // Copiar propiedades que no están en `actividadString` pero necesitas mantener (si hay)
	            actividad.setPuntuacion(existingActividad.getPuntuacion());
	            // Otros campos pueden ser copiados de manera similar si no son parte del JSON enviado

	            if (file != null && !file.isEmpty()) {
	                String fileName = fileStorageService.storeFile(file);
	                actividad.setImagen(fileName); // Establece la nueva imagen solo si se sube una nueva
	            } else {
	                actividad.setImagen(existingActividad.getImagen()); // Mantener la imagen anterior si no se proporciona una nueva
	            }

	            actividad.setId(id); // Asegúrate de establecer el ID para actualizar la entidad existente
	            Actividad updatedActividad = actividadService.save(actividad);
	            return ResponseEntity.ok(updatedActividad);
	        } catch (IOException e) {
	            logger.error("Error updating activity", e);
	            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
	        }
	    }).orElseGet(() -> ResponseEntity.notFound().build());
	}


	/**
	 * Elimina una actividad por su identificador.
	 * 
	 * @param id El identificador único de la actividad a eliminar.
	 * @return ResponseEntity con código de estado 200 si se elimina con éxito, o no
	 *         encontrado (404) si no se encuentra la actividad.
	 */
	@DeleteMapping("/{id}")
	public ResponseEntity<Void> deleteActividad(@PathVariable Integer id) {
		return actividadService.findById(id).map(actividad -> {
			actividadService.deleteById(id);
			return ResponseEntity.ok().<Void>build();
		}).orElseGet(() -> ResponseEntity.notFound().build());

	}
	
	
	/**
	 * Calcula la puntuación promedio de una actividad basandose en la puntuación de los comentarios
	 * 
	 * @param id de la actividad
	 * @return El promedio de la puntuación
	 */
	   @GetMapping("/{id}/puntuacionPromedio")
	    public Double getPuntuacionPromedioPorActividadId(@PathVariable Integer id) {
	        return actividadService.getPuntuacionPromedioPorActividadId(id);
	    }
	
	
	
	
	
	
}
