package com.planazo.servicio;

import java.util.List;
import java.util.Optional;

import org.springframework.security.core.userdetails.UserDetailsService;

import com.planazo.entidad.Usuario;

public interface UsuarioServicio {

	List<Usuario> findAll();

	Optional<Usuario> findById(Integer id);

	Usuario save(Usuario usuario);

	void deleteById(Integer id);

	Optional<Usuario> findByNombreUsuario(String nombreUsuario);

	UserDetailsService userDetailsService();
	
	 Usuario addActividadFavorita(Integer usuarioId, Integer actividadId);
	 
	 Usuario removeActividadFavorita(Integer usuarioId, Integer actividadId);
	 
	

}
