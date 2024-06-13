package com.planazo.repositorio;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.planazo.entidad.Comentario;

@Repository
public interface ComentarioRepositorio extends JpaRepository<Comentario, Integer> {
    
    List<Comentario> findByActividadId(Integer actividadId);
    List<Comentario> findByUsuarioId(Integer usuarioId);
    
    
}