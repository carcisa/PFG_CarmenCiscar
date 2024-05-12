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

import com.planazo.entidad.Comentario;
import com.planazo.servicio.ComentarioServicio;

import jakarta.validation.Valid;

/**
 * Controlador REST para gestionar comentarios. Proporciona endpoints para
 * operaciones CRUD sobre comentarios.
 */
@RestController
@RequestMapping("/api/comentario")
public class ComentarioControlador {

    private final ComentarioServicio comentarioServicio;

    @Autowired
    public ComentarioControlador(ComentarioServicio comentarioServicio) {
        this.comentarioServicio = comentarioServicio;
    }

    /**
     * Obtiene todos los comentarios.
     * 
     * @return Una lista de comentarios.
     */
    @GetMapping
    public List<Comentario> getAllComentarios() {
        return comentarioServicio.findAll();
    }

    /**
     * Obtiene un comentario por su ID.
     * 
     * @param id El ID del comentario.
     * @return ResponseEntity con el comentario si se encuentra, o no encontrado (404) si no se encuentra.
     */
    @GetMapping("/{id}")
    public ResponseEntity<Comentario> getComentarioById(@PathVariable Integer id) {
        return comentarioServicio.obtenerComentarioPorId(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    /**
     * Crea un nuevo comentario.
     * 
     * @param comentario Detalles del comentario a crear.
     * @return El comentario creado.
     */
    @PostMapping
    public Comentario createComentario(@Valid @RequestBody Comentario comentario) {
        return comentarioServicio.guardarComentario(comentario);
    }

    /**
     * Actualiza un comentario existente.
     * 
     * @param id El ID del comentario a actualizar.
     * @param comentarioDetalles Los nuevos detalles del comentario.
     * @return ResponseEntity con el comentario actualizado si se encuentra, o no encontrado (404) si no se encuentra.
     */
    @PutMapping("/{id}")
    public ResponseEntity<Comentario> updateComentario(@PathVariable Integer id, @Valid @RequestBody Comentario comentarioDetalles) {
        return comentarioServicio.obtenerComentarioPorId(id).map(comentario -> {
            comentario.setTitulo(comentarioDetalles.getTitulo());
            comentario.setDescripcion(comentarioDetalles.getDescripcion());
            comentario.setPuntuacion(comentarioDetalles.getPuntuacion());
            // No actualizamos usuario y actividad para mantener la integridad referencial.
            Comentario updatedComentario = comentarioServicio.guardarComentario(comentario);
            return ResponseEntity.ok(updatedComentario);
        }).orElse(ResponseEntity.notFound().build());
    }

    /**
     * Elimina un comentario por su ID.
     * 
     * @param id El ID del comentario a eliminar.
     * @return ResponseEntity con código de estado 200 si se elimina con éxito, o no encontrado (404) si no se encuentra el comentario.
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteComentario(@PathVariable Integer id) {
        return comentarioServicio.obtenerComentarioPorId(id).map(comentario -> {
            comentarioServicio.eliminarComentario(id);
            return ResponseEntity.ok().<Void>build();
        }).orElse(ResponseEntity.notFound().build());
    }
    
    
    
    /**
     * Obtiene todos los comentarios asociados a una actividad específica por el ID de la actividad.
     * 
     * @param actividadId El ID de la actividad.
     * @return Una lista de comentarios para la actividad especificada.
     */
    @GetMapping("/actividades/{Id}/comentario")
    public ResponseEntity<List<Comentario>> getComentariosPorActividadId(@PathVariable Integer actividadId) {
        List<Comentario> comentarios = comentarioServicio.obtenerComentariosPorActividadId(actividadId);
        if (comentarios.isEmpty()) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.ok(comentarios);
    }
    
    
    /**
     * Obtiene todos los comentarios asociados a un usuario específico por el ID del usuario.
     * 
     * @param usuariodId El ID del usuario
     * @return Una lista de comentarios para el usuario identificado.
     */
    @GetMapping("/usuarios/{Id}/comentarios")
    public ResponseEntity<List<Comentario>> getComentariosPorUsuarioId(@PathVariable Integer usuarioId) {
        List<Comentario> comentarios = comentarioServicio.obtenerComentariosPorUsuarioId(usuarioId);
        if (comentarios.isEmpty()) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.ok(comentarios);
    }

    
    
    
    
    
    
    
    
}
