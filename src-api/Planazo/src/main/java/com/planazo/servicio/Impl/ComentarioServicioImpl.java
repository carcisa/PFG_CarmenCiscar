package com.planazo.servicio.Impl;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

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
	public Comentario guardarComentario(Comentario comentario) {
		return comentarioRepositorio.save(comentario);
	}

	@Override
	public Optional<Comentario> obtenerComentarioPorId(Integer id) {
		return comentarioRepositorio.findById(id);
	}

	@Override
	public List<Comentario> obtenerComentariosPorActividadId(Integer actividadId) {
		return comentarioRepositorio.findByActividadId(actividadId);
	}

	@Override
	public List<Comentario> obtenerComentariosPorUsuarioId(Integer usuarioId) {
		return comentarioRepositorio.findByUsuarioId(usuarioId);
	}

	@Override
	public void eliminarComentario(Integer id) {
		comentarioRepositorio.deleteById(id);
	}

	@Override
	public List<Comentario> findAll() {
		return comentarioRepositorio.findAll();
	}
}