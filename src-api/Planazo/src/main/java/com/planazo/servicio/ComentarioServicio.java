package com.planazo.servicio;

import java.util.List;
import java.util.Optional;

import com.planazo.DTO.ComentarioDTO;
import com.planazo.entidad.Comentario;

public interface ComentarioServicio {
    List<ComentarioDTO> findAll();
    Optional<ComentarioDTO> obtenerComentarioPorId(Integer id);
    Optional<Comentario> obtenerComentarioPorIdEntidad(Integer id); 
    ComentarioDTO guardarComentario(Comentario comentario);
    void eliminarComentario(Integer id);
    List<ComentarioDTO> obtenerComentariosPorUsuarioId(Integer usuarioId);
    List<ComentarioDTO> obtenerComentariosPorActividadId(Integer actividadId);
}
