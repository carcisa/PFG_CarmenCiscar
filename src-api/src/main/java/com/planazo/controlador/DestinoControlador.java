package com.planazo.controlador;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.planazo.entidad.Actividad;
import com.planazo.entidad.Destino;
import com.planazo.error.destino.DestinoNoEncontradoException;
import com.planazo.error.usuario.ListaUsuariosVaciaException;
import com.planazo.servicio.DestinoServicio;

import jakarta.validation.Valid;


/**
 * Controlador REST para gestionar destinos.
 * Proporciona endpoints para operaciones CRUD sobre destinos, incluyendo la gestión de actividades asociadas.
 */
@RestController
@RequestMapping("/api/destinos")
public class DestinoControlador {

    @Autowired
    private final DestinoServicio destinoService;
    
    

    /**
     * Constructor para inyectar el servicio de destinos.
     * @param destinoService El servicio que gestiona las operaciones sobre destinos.
     */
    public DestinoControlador(DestinoServicio destinoService) {
        this.destinoService = destinoService;
    }

    /**
     * Obtiene todos los destinos disponibles.
     * @return Una lista de destinos.
     */
    @GetMapping("/")
    @Transactional
    public List<Destino> getAllDestinos() {
    	List<Destino> destinos = destinoService.findAll(); 
	    if (destinos.isEmpty()) {
	         throw new ListaUsuariosVaciaException("El listado de usuarios está vacío");
	    }
        return destinoService.findAll();
    }

    /**
     * Obtiene un destino por su identificador.
     * @param id El identificador único del destino.
     * @return ResponseEntity con el destino si se encuentra, o no encontrado (404) si no se encuentra.
     */
    @GetMapping("/{id}")
    public ResponseEntity<Destino> getDestinoById(@PathVariable Integer id) {
        return destinoService.findById(id)
                .map(ResponseEntity::ok)
                .orElseThrow(() ->  new DestinoNoEncontradoException("El destino no existe" + id));
    }

    /**
     * Obtiene las actividades asociadas a un destino específico por el identificador del destino.
     * @param id El identificador único del destino.
     * @return ResponseEntity con una lista de actividades si el destino existe, o vacío si no existe.
     */
    @GetMapping("/{id}/actividades")
    public ResponseEntity<List<Actividad>> ActividadesGetDestinoById(@PathVariable Integer id) {
        Optional<Destino> destino = destinoService.findById(id);
        List<Actividad> actividades = destino.get().getActividades();
        return ResponseEntity.ok(actividades);
    }

    /**
     * Crea un nuevo destino.
     * @param destino Los detalles del destino a crear.
     * @return El destino creado.
     */
    @PostMapping
    public Destino createDestino(@RequestBody Destino destino) {
        return destinoService.save(destino);
    }

    /**
     * Agrega una actividad a un destino existente.
     * @param destino_Id El identificador del destino al que se agrega la actividad.
     * @param actividad La actividad a agregar al destino.
     * @return ResponseEntity con la actividad agregada y estado CREATED si el destino existe, o notFound si el destino no existe.
     */
    @PostMapping("/{destino_Id}/actividades")
    public ResponseEntity<Actividad> addActividadToDestino(@Valid @PathVariable Integer destino_Id, @RequestBody Actividad actividad) {
        return destinoService.findById(destino_Id).map(destino -> {
            destino.agregarActividad(actividad);
            destinoService.save(destino);
            return new ResponseEntity<>(actividad, HttpStatus.CREATED);
        }).orElse(ResponseEntity.notFound().build());
    }

    /**
     * Actualiza un destino existente.
     * @param id El identificador único del destino a actualizar.
     * @param destinoDetails Los nuevos detalles del destino.
     * @return ResponseEntity con el destino actualizado si se encuentra, o no encontrado (404) si no se encuentra.
     */
	
    @PutMapping("/{id}")
    public ResponseEntity<Destino> updateDestino(@Valid @PathVariable Integer id, @RequestBody Destino destinoDetails) {
        return destinoService.findById(id)
                .map(destino -> {
                    destino.setNombre(destinoDetails.getNombre());
                    Destino updatedDestino = destinoService.save(destino);
                    return ResponseEntity.ok(updatedDestino);
                })
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    
    /**
     * Elimina un destino por su identificador.
     * @param id El identificador único del destino a eliminar.
     * @return ResponseEntity con código de estado 200 si se elimina con éxito, o no encontrado (404) si no se encuentra el destino.
     */
    @Transactional
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteDestino(@PathVariable Integer id) {
//    	if (destinoService.findById(id).isPresent()) {
//    		destinoService.deleteById(id);
//    		return ResponseEntity.ok().build();
//    	} else {
//			return ResponseEntity.notFound().build();
//		}
        return destinoService.findById(id)
                .map(destino -> {
                    destinoService.deleteById(id);
                    return ResponseEntity.noContent().<Void>build();
                })
                .orElseGet(() -> ResponseEntity.notFound().build());
    }
    
    /**
     * Obtiene un destino por su nombre.
     * @param nombre El nombre del destino.
     * @return ResponseEntity con el destino si se encuentra, o no encontrado (404) si no se encuentra.
     */
    @GetMapping("/buscar/{nombre}")
    public ResponseEntity<Destino> getDestinoByNombre(@PathVariable String nombre) {
        return destinoService.findByNombre(nombre)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
}
