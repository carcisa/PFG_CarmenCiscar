package com.planazo.servicio;

import java.util.List;
import java.util.Optional;

import com.planazo.entidad.Actividad;
import com.planazo.entidad.Comentario;

public interface ComentarioServicio {

	Comentario guardarComentario(Comentario comentario);

	Optional<Comentario> obtenerComentarioPorId(Integer id);
	
	List<Comentario> findAll();

	List<Comentario> obtenerComentariosPorActividadId(Integer actividadId);

	List<Comentario> obtenerComentariosPorUsuarioId(Integer usuarioId);

	void eliminarComentario(Integer id);

}
