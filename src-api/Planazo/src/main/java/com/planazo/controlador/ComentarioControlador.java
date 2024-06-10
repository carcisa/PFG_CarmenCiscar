package com.planazo.controlador;

import java.util.List;
import java.util.Optional;

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

import com.planazo.DTO.ComentarioDTO;
import com.planazo.entidad.Actividad;
import com.planazo.entidad.Comentario;
import com.planazo.entidad.Usuario;
import com.planazo.servicio.ComentarioServicio;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/comentarios")
public class ComentarioControlador {

    private final ComentarioServicio comentarioServicio;

    @Autowired
    public ComentarioControlador(ComentarioServicio comentarioServicio) {
        this.comentarioServicio = comentarioServicio;
    }

    @GetMapping
    public List<ComentarioDTO> getAllComentarios() {
        return comentarioServicio.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<ComentarioDTO> getComentarioById(@PathVariable Integer id) {
        Optional<ComentarioDTO> comentarioDTO = comentarioServicio.obtenerComentarioPorId(id);
        return comentarioDTO.map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ComentarioDTO createComentario(@Valid @RequestBody ComentarioDTO comentarioDTO) {
        Comentario comentario = new Comentario();
        comentario.setTitulo(comentarioDTO.getTitulo());
        comentario.setDescripcion(comentarioDTO.getDescripcion());
        comentario.setPuntuacion(comentarioDTO.getPuntuacion());
        comentario.setUsuario(new Usuario(comentarioDTO.getUsuarioId()));
        comentario.setActividad(new Actividad(comentarioDTO.getActividadId()));
        ComentarioDTO comentarioGuardado = comentarioServicio.guardarComentario(comentario); 
        return comentarioGuardado;
    }

    @PutMapping("/{id}")
    public ResponseEntity<ComentarioDTO> updateComentario(@PathVariable Integer id, @Valid @RequestBody ComentarioDTO comentarioDetalles) {
        Optional<Comentario> comentarioOptional = comentarioServicio.obtenerComentarioPorIdEntidad(id);
        if (comentarioOptional.isPresent()) {
            Comentario comentario = comentarioOptional.get();
            comentario.setTitulo(comentarioDetalles.getTitulo());
            comentario.setDescripcion(comentarioDetalles.getDescripcion());
            comentario.setPuntuacion(comentarioDetalles.getPuntuacion());
            // No actualizamos usuario y actividad para mantener la integridad referencial.
            ComentarioDTO comentarioActualizado = comentarioServicio.guardarComentario(comentario);
            return ResponseEntity.ok(comentarioActualizado);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteComentario(@PathVariable Integer id) {
        Optional<Comentario> comentarioOptional = comentarioServicio.obtenerComentarioPorIdEntidad(id); 
        if (comentarioOptional.isPresent()) {
            comentarioServicio.eliminarComentario(id);
            return ResponseEntity.ok().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/usuarios/{usuarioId}/comentarios")
    public ResponseEntity<List<ComentarioDTO>> getComentariosPorUsuarioId(@PathVariable Integer usuarioId) {
        List<ComentarioDTO> comentarios = comentarioServicio.obtenerComentariosPorUsuarioId(usuarioId);
        if (comentarios.isEmpty()) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.ok(comentarios);
    }

    @GetMapping("/actividades/{actividadId}/comentarios")
    public ResponseEntity<List<ComentarioDTO>> getComentariosPorActividadId(@PathVariable Integer actividadId) {
        List<ComentarioDTO> comentarios = comentarioServicio.obtenerComentariosPorActividadId(actividadId);
        if (comentarios.isEmpty()) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.ok(comentarios);
    }
}
