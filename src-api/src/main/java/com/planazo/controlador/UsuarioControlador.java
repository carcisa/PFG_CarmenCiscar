package com.planazo.controlador;

import java.util.Collections;
import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;

import javax.management.relation.Role;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.planazo.DTO.UsuarioDto;
import com.planazo.entidad.Actividad;
import com.planazo.entidad.Destino;
import com.planazo.entidad.Rol;
import com.planazo.entidad.Usuario;
import com.planazo.error.usuario.ListaUsuariosVaciaException;
import com.planazo.error.usuario.UsuarioNoEncontradoException;
import com.planazo.repositorio.UsuarioRepositorio;
import com.planazo.servicio.ActividadServicio;
import com.planazo.servicio.UsuarioServicio;
import com.planazo.servicio.Impl.UsuarioMapper;

import jakarta.validation.Valid;

/**
 * Controlador REST para manejar operaciones de usuarios. Proporciona endpoints
 * para realizar operaciones CRUD sobre usuarios.
 */
@RestController
@RequestMapping("/api/usuarios")
public class UsuarioControlador {

	private final UsuarioServicio usuarioService;
	private final ActividadServicio actividaServicio;

	@Autowired
	private UsuarioRepositorio usuarioRepository;

	@Autowired
	private UsuarioMapper usuarioMapper;

	@Autowired
	private PasswordEncoder passwordEncoder;

	/**
	 * Constructor para inyección de dependencias del servicio de usuarios.
	 * 
	 * @param usuarioService El servicio para manejar operaciones de usuarios.
	 */
	@Autowired
	public UsuarioControlador(UsuarioServicio usuarioService, ActividadServicio actividadServicio) {
		this.usuarioService = usuarioService;
		this.actividaServicio = actividadServicio;
	}

	/**
	 * Obtiene todos los usuarios.
	 * 
	 * @return Lista de todos los usuarios.
	 */
	@GetMapping("/")
	public ResponseEntity<List<Usuario>> getAllUsuarios() {
		List<Usuario> usuarios = usuarioService.findAll();
		if (usuarios.isEmpty()) {
			throw new ListaUsuariosVaciaException("El listado de usuarios está vacío");
		}
		return ResponseEntity.ok(usuarios);
	}

	/**
	 * Obtiene un usuario por su ID.
	 * 
	 * @param id El ID del usuario a buscar.
	 * @return ResponseEntity con el usuario encontrado(200) o no encontrado (404).
	 */
	@GetMapping("/{id}")
	public ResponseEntity<Usuario> getUsuarioById(@PathVariable Integer id) {
		Optional<Usuario> usuario = usuarioService.findById(id);
		return usuario.map(ResponseEntity::ok)
				.orElseThrow(() -> new UsuarioNoEncontradoException("El usuario no existe" + id));
	}

	/**
	 * Crea un nuevo usuario.
	 * 
	 * @param usuario El usuario a crear.
	 * @return El usuario creado.
	 */
	@PostMapping
	public ResponseEntity<Usuario> createUsuario(@Valid @RequestBody UsuarioDto usuarioDto) {
		Usuario usuario = new Usuario();
		usuario.setEmail(usuarioDto.getEmail());
		usuario.setNombreUsuario(usuarioDto.getNombreUsuario());
		usuario.setApellidoUsuario(usuarioDto.getApellidoUsuario());
		usuario.setPassword(passwordEncoder.encode(usuarioDto.getPassword()));
		usuario.setRoles(Collections.singleton(Rol.ROL_USER));
		Usuario nuevoUsuario = usuarioService.save(usuario);
		return ResponseEntity.ok(nuevoUsuario);
	}

	/**
	 * Crea un nuevo usuario administrador
	 * 
	 * @param usuario El usuario a crear.
	 * @return El usuario creado.
	 */
	@PostMapping("/admin/createUser")
	public ResponseEntity<Usuario> createUsuarioAdmin(@Valid @RequestBody UsuarioDto usuarioDto) {
		Usuario usuario = new Usuario();
		usuario.setEmail(usuarioDto.getEmail());
		usuario.setNombreUsuario(usuarioDto.getNombreUsuario());
		usuario.setApellidoUsuario(usuarioDto.getApellidoUsuario());
		usuario.setPassword(passwordEncoder.encode(usuarioDto.getPassword()));

		Set<Rol> roles = usuarioDto.getRoles().stream().map(roleStr -> Rol.valueOf(roleStr)) // Convierte el String a
																								// Role
				.collect(Collectors.toSet());

		usuario.setRoles(roles.isEmpty() ? Collections.singleton(Rol.ROL_USER) : roles);

		Usuario nuevoUsuario = usuarioService.save(usuario);
		return ResponseEntity.ok(nuevoUsuario);
	}

	/**
	 * Actualiza un usuario existente.
	 * 
	 * @param id             El ID del usuario a actualizar.
	 * @param usuarioDetails Los detalles actualizados del usuario.
	 * @return ResponseEntity con el usuario actualizado(200) o no encontrado (404).
	 */
//	@PutMapping("/{id}")
//	public ResponseEntity<Usuario> updateUsuario(@PathVariable Integer id, @RequestBody UsuarioDto usuario) {
//		Optional<Usuario> usuarioOptional = usuarioService.findById(id);
//		if (!usuarioOptional.isPresent()) {
//			return ResponseEntity.notFound().build();
//		}
//		Usuario us = usuarioOptional.get();
//		us.setNombreUsuario(usuario.getNombreUsuario());
//		us.setApellidoUsuario(usuario.getApellidoUsuario());
//		Usuario updatedUsuario = usuarioService.save(us);
//		return ResponseEntity.ok(updatedUsuario);
//	}

	@PutMapping("/{id}")
	public ResponseEntity<Usuario> updateUsuario(@PathVariable Integer id, @RequestBody UsuarioDto usuarioDto) {
		Optional<Usuario> usuarioOptional = usuarioService.findById(id);
		if (!usuarioOptional.isPresent()) {
			return ResponseEntity.notFound().build();
		}

		try {
			Usuario usuario = usuarioOptional.get();
			usuario.setNombreUsuario(usuarioDto.getNombreUsuario());
			usuario.setApellidoUsuario(usuarioDto.getApellidoUsuario());
			usuario.setEmail(usuarioDto.getEmail());
			usuario.setPassword(usuarioDto.getPassword());

			Usuario updatedUsuario = usuarioService.save(usuario);
			return ResponseEntity.ok(updatedUsuario);
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
		}
	}

	/**
	 * Elimina un usuario por su ID.
	 * 
	 * @param id El ID del usuario a eliminar.
	 * @return ResponseEntity con el código de estado 200 si se eliminó con éxito o
	 *         no encontrado (404) si el usuario no existe.
	 */
	@DeleteMapping("/{id}")
	public ResponseEntity<Void> deleteUsuario(@PathVariable Integer id) {
		if (!usuarioService.findById(id).isPresent()) {
			return ResponseEntity.notFound().build();
		}
		usuarioService.deleteById(id);
		return ResponseEntity.ok().build();
	}

	@GetMapping("/detalles")
	public ResponseEntity<Usuario> getUsuarioByEmail(@RequestParam String email) {
		try {
			Usuario usuario = (Usuario) usuarioService.userDetailsService().loadUserByUsername(email);
			return ResponseEntity.ok(usuario);
		} catch (UsernameNotFoundException ex) {
			return ResponseEntity.notFound().build();
		}
	}
	

	@PostMapping("/{usuarioId}/actividades")
	public ResponseEntity<Actividad> addActividadFavoritos(@PathVariable Integer usuarioId, @RequestBody Actividad actividad) {
	    Optional<Usuario> usuarioOptional = usuarioService.findById(usuarioId);
	    if (!usuarioOptional.isPresent()) {
	        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
	    }
	    
	    Optional<Actividad> actividadOptional = actividaServicio.findById(actividad.getId());
	    if (!actividadOptional.isPresent()) {
	        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
	    }
	    
	    Usuario usuario = usuarioOptional.get();
	    Actividad actividadEntidad = actividadOptional.get();
	    
	    usuario.agregarActividad(actividadEntidad);
	    usuarioService.save(usuario);

	    return ResponseEntity.status(HttpStatus.CREATED).body(actividadEntidad);
	}


	
	
	@GetMapping("/{id}/actividades")
	public ResponseEntity<?> ActividadesGetUsuarioById(@PathVariable Integer id) {
	    Optional<Usuario> usuarioOptional = usuarioService.findById(id);
	    if (!usuarioOptional.isPresent()) {
	        return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Usuario no encontrado");
	    }

	    Usuario usuario = usuarioOptional.get();
	    Set<Actividad> actividades = usuario.getActividadesFavoritas();
	    return ResponseEntity.ok(actividades);
	}


//	  @PostMapping("/{usuarioId}/favoritos/{actividadId}")
//	    public ResponseEntity<Usuario> addActividadFavorita(@PathVariable Integer usuarioId, @PathVariable Integer actividadId) {
//	        Usuario usuario = usuarioService.addActividadFavorita(usuarioId, actividadId);
//	        if (usuario != null) {
//	            return ResponseEntity.ok(usuario);
//	        }
//	        return ResponseEntity.badRequest().build();
//	    }

	@DeleteMapping("/{usuarioId}/favoritos/{actividadId}")
	public ResponseEntity<Usuario> removeActividadFavorita(@PathVariable Integer usuarioId,
			@PathVariable Integer actividadId) {
		Optional<Usuario> usuarioOptional = usuarioService.findById(usuarioId);
	    if (!usuarioOptional.isPresent()) {
	        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
	    }
	    
	    Optional<Actividad> actividadOptional = actividaServicio.findById(actividadId);
	    if (!actividadOptional.isPresent()) {
	        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
	    }

	    Usuario usuario = usuarioOptional.get();
	    Actividad actividad = actividadOptional.get();

	    if (usuario.getActividadesFavoritas().contains(actividad)) {
	        usuario.getActividadesFavoritas().remove(actividad);
	        usuarioService.save(usuario);
	        return ResponseEntity.ok(usuario);
	    } else {
	        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);
	    }
	}

}
