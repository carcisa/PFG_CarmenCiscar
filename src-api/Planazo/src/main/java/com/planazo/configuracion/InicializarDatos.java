package com.planazo.configuracion;

import java.util.Collections;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import com.planazo.entidad.Rol;
import com.planazo.entidad.Usuario;
import com.planazo.repositorio.UsuarioRepositorio;



/**
 * Clase de configuración que implementa CommandLineRunner para inicializar
 * datos en la base de datos al arranque de la aplicación. Utiliza Faker para
 * generar datos aleatorios para usuarios, destinos y actividades.
 */
@Component
public class InicializarDatos implements CommandLineRunner {

	@Autowired
	private UsuarioRepositorio usuarioRepository;

	@Autowired
	private PasswordEncoder passwordEncoder;

	@Override
	public void run(String... args) throws Exception {

		insertarUsuarioSiNoExiste("admin@example.com", "admin", "admin1234", Rol.ROL_ADMIN);
		insertarUsuarioSiNoExiste("user@example.com", "user", "user1234", Rol.ROL_USER);

	}

	private void insertarUsuarioSiNoExiste(String email, String nombreUsuario, String contraseña, Rol role) {
		usuarioRepository.findByEmail(email).orElseGet(() -> {
			Usuario usuario = new Usuario();
			usuario.setEmail(email);
			usuario.setNombreUsuario(nombreUsuario);
			usuario.setPassword(passwordEncoder.encode(contraseña));
			usuario.setRoles(Collections.singleton(role));
			return usuarioRepository.save(usuario);
		});
	}



}
