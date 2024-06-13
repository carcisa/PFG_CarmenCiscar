package com.planazo.servicio.Impl;

import java.util.List;
import java.util.Optional;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.planazo.entidad.Actividad;
import com.planazo.entidad.Usuario;
import com.planazo.repositorio.ActividadRepositorio;
import com.planazo.repositorio.UsuarioRepositorio;
import com.planazo.servicio.UsuarioServicio;

import jakarta.transaction.Transactional;

/**
 * Servicio que implementa la lógica de negocio para la gestión de usuarios.
 * Proporciona la implementación de las operaciones CRUD para usuarios y la carga de detalles de usuarios para la autenticación.
 */
@Service
public class UsuarioServiceImpl implements UsuarioServicio {
	
	 private static final Logger logger = LoggerFactory.getLogger(UsuarioServiceImpl.class);

    private final UsuarioRepositorio usuarioRepository;
    
    @Autowired
    private ActividadRepositorio actividadRepositorio;

    /**
     * Constructor que inyecta el repositorio de usuarios.
     * @param usuarioRepository El repositorio para realizar operaciones de base de datos sobre usuarios.
     */
    public UsuarioServiceImpl(UsuarioRepositorio usuarioRepository) {
        this.usuarioRepository = usuarioRepository;
    }

    /**
     * Recupera todos los usuarios existentes.
     * @return Una lista de todos los usuarios.
     */
    @Transactional
    @Override
    public List<Usuario> findAll() {
        return usuarioRepository.findAll();
    }

    /**
     * Busca un usuario por su identificador.
     * @param id El identificador del usuario.
     * @return Un Optional que contiene el usuario encontrado o un Optional vacío si no se encuentra.
     */
    @Transactional
    @Override
    public Optional<Usuario> findById(Integer id) {
        return usuarioRepository.findById(id);
    }

    /**
     * Elimina un usuario por su identificador.
     * @param id El identificador del usuario a eliminar.
     */
    @Transactional
    @Override
    public void deleteById(Integer id) {
        usuarioRepository.deleteById(id);
    }
    
    /**
     * Guarda un usuario en la base de datos. Si el usuario es nuevo, lo crea; si el usuario ya existe, actualiza sus datos.
     * @param usuario El usuario a guardar.
     * @return El usuario guardado.
     */
    @Transactional
    @Override
    public Usuario save(Usuario usuario) {
        try {
            if (usuario.getPassword() == null || usuario.getPassword().isEmpty()) {
                throw new IllegalArgumentException("El password no puede estar vacío");
            }
            logger.debug("Actualizando usuario: {}", usuario);
            Usuario updatedUser = usuarioRepository.save(usuario);
            logger.debug("Usuario actualizado: {}", updatedUser);
            return updatedUser;
        } catch (Exception e) {
            logger.error("Error al actualizar el usuario: {}", e.getMessage(), e);
            throw e;
        }
    }

    /**
     * Busca un usuario por su nombre de usuario.
     * @param nombreUsuario El nombre de usuario del usuario a buscar.
     * @return Un Optional que contiene el usuario encontrado o un Optional vacío si no se encuentra.
     */
    @Override
    public Optional<Usuario> findByNombreUsuario(String nombreUsuario) {
        return Optional.empty();
    }

    /**
     * Proporciona una implementación de UserDetailsService para cargar los detalles de un usuario por su correo electrónico.
     * @return Una instancia de UserDetailsService.
     */
    @Override
    public UserDetailsService userDetailsService() {
        return email -> usuarioRepository.findByEmail(email)
                        .orElseThrow(() -> new UsernameNotFoundException("Usuario no encontrado con el correo: " + email));
    }
    
    @Override
    public Usuario addActividadFavorita(Integer usuarioId, Integer actividadId) {
        Optional<Usuario> usuarioOpt = usuarioRepository.findById(usuarioId);
        Optional<Actividad> actividadOpt = actividadRepositorio.findById(actividadId);

        if (usuarioOpt.isPresent() && actividadOpt.isPresent()) {
            Usuario usuario = usuarioOpt.get();
            Actividad actividad = actividadOpt.get();
            usuario.getActividadesFavoritas().add(actividad);
            return usuarioRepository.save(usuario);
        }
        return null;
    }

    @Override
    public Usuario removeActividadFavorita(Integer usuarioId, Integer actividadId) {
        Optional<Usuario> usuarioOpt = usuarioRepository.findById(usuarioId);
        Optional<Actividad> actividadOpt = actividadRepositorio.findById(actividadId);

        if (usuarioOpt.isPresent() && actividadOpt.isPresent()) {
            Usuario usuario = usuarioOpt.get();
            Actividad actividad = actividadOpt.get();
            usuario.getActividadesFavoritas().remove(actividad);
            return usuarioRepository.save(usuario);
        }
        return null;
    }

	
}

