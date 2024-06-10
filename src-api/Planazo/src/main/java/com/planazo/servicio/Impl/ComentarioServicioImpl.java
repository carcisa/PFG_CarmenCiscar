package com.planazo.servicio.Impl;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.planazo.DTO.ComentarioDTO;
import com.planazo.entidad.Comentario;
import com.planazo.repositorio.ComentarioRepositorio;
import com.planazo.servicio.ComentarioServicio;

@Service
public class ComentarioServicioImpl implements ComentarioServicio {

    private final ComentarioRepositorio comentarioRepositorio;

    @Autowired
    public ComentarioServicioImpl(ComentarioRepositorio comentarioRepositorio) {
        this.comentarioRepositorio = comentarioRepositorio;
    }

    @Override
    public List<ComentarioDTO> findAll() {
        return comentarioRepositorio.findAll().stream()
                .map(ComentarioDTO::new)
                .collect(Collectors.toList());
    }

    @Override
    public Optional<ComentarioDTO> obtenerComentarioPorId(Integer id) {
        return comentarioRepositorio.findById(id)
                .map(ComentarioDTO::new);
    }

    @Override
    public Optional<Comentario> obtenerComentarioPorIdEntidad(Integer id) {
        return comentarioRepositorio.findById(id);
    }

    @Override
    public ComentarioDTO guardarComentario(Comentario comentario) {
        Comentario savedComentario = comentarioRepositorio.save(comentario);
        return new ComentarioDTO(savedComentario); 
    }

    @Override
    public void eliminarComentario(Integer id) {
        comentarioRepositorio.deleteById(id);
    }

    @Override
    public List<ComentarioDTO> obtenerComentariosPorUsuarioId(Integer usuarioId) {
        return comentarioRepositorio.findByUsuarioId(usuarioId).stream()
                .map(ComentarioDTO::new)
                .collect(Collectors.toList());
    }

    @Override
    public List<ComentarioDTO> obtenerComentariosPorActividadId(Integer actividadId) {
        return comentarioRepositorio.findByActividadId(actividadId).stream()
                .map(ComentarioDTO::new)
                .collect(Collectors.toList());
    }
}
