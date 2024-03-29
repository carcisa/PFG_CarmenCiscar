package com.planazo.controlador;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.planazo.entidad.Actividad;
import com.planazo.error.actividad.ActividadNoEncontradaException;
import com.planazo.error.actividad.ListaActividadesVaciaException;
import com.planazo.servicio.ActividadServicio;
import com.planazo.servicio.DestinoServicio;

import jakarta.validation.Valid;

/**
 * Controlador REST para gestionar actividades. Proporciona endpoints para
 * operaciones CRUD sobre actividades.
 */
@RestController
@RequestMapping("/api/actividades")
public class ActividadControlador {

	private final ActividadServicio actividadService;

	@Autowired
	private DestinoServicio destinoService;

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
	@PostMapping
	public Actividad createActividad(@Valid @RequestBody Actividad actividad) {
		return actividadService.save(actividad);
	}

	/**
	 * Actualiza una actividad existente.
	 * 
	 * @param id               El identificador único de la actividad a actualizar.
	 * @param actividadDetails Los nuevos detalles de la actividad.
	 * @return ResponseEntity con la actividad actualizada si se encuentra, o no
	 *         encontrado (404) si no se encuentra.
	 */
	@PutMapping("/{id}")
	public ResponseEntity<Actividad> updateActividad(@Valid @PathVariable Integer id,
			@RequestBody Actividad actividadDetails) {
		return actividadService.findById(id).map(actividad -> {
			actividad.setNombre(actividadDetails.getNombre());
			actividad.setDescripcion(actividadDetails.getDescripcion());
			actividad.setCategoria(actividadDetails.getCategoria());
			actividad.setDireccion(actividadDetails.getDireccion());
			Actividad updatedActividad = actividadService.save(actividad);
			return ResponseEntity.ok(updatedActividad);
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
}
