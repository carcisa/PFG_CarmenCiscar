package com.planazo.servicio.Impl;

import java.util.HashSet;
import java.util.Set;
import java.util.stream.Collectors;

import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.planazo.DTO.JwtAuthenticationResponse;
import com.planazo.entidad.Rol;
import com.planazo.entidad.Usuario;
import com.planazo.error.usuario.UsuarioDatosNoValidosException;
import com.planazo.error.usuario.UsuarioDuplicadoException;
import com.planazo.error.usuario.UsuarioNoEncontradoException;
import com.planazo.repositorio.UsuarioRepositorio;
import com.planazo.request.SignUpRequest;
import com.planazo.request.SigninRequest;
import com.planazo.servicio.AuthenticationServicio;
import com.planazo.servicio.JwtServicio;

/**
 * Implementación del servicio de autenticación, gestionando el registro y el
 * inicio de sesión de los usuarios.
 */
@Service
public class AuthenticationServiceImpl implements AuthenticationServicio {
	private UsuarioRepositorio userRepository;
	private final PasswordEncoder passwordEncoder;
	private final JwtServicio jwtService;
	private final AuthenticationManager authenticationManager;

	/**
	 * Constructor para inyección de dependencias requeridas para la autenticación.
	 *
	 * @param userRepository        Repositorio de usuarios para operaciones de base
	 *                              de datos.
	 * @param passwordEncoder       Codificador de contraseñas para asegurar las
	 *                              contraseñas de los usuarios.
	 * @param jwtService            Servicio para la generación de tokens JWT.
	 * @param authenticationManager Gestor de autenticación para Spring Security.
	 */
	public AuthenticationServiceImpl(UsuarioRepositorio userRepository, PasswordEncoder passwordEncoder,
			JwtServicio jwtService, AuthenticationManager authenticationManager) {
		this.userRepository = userRepository;
		this.passwordEncoder = passwordEncoder;
		this.jwtService = jwtService;
		this.authenticationManager = authenticationManager;
	}



	@Override
	public JwtAuthenticationResponse signup(SignUpRequest request) {
		try {
			if (userRepository.existsByEmail(request.getEmail())) {
				throw new UsuarioDuplicadoException("El email ya existe.");
			}
			Usuario user = new Usuario();
			user.setNombreUsuario(request.getnombreUsuario());
			user.setApellidoUsuario(request.getapellidoUsuario());
			user.setEmail(request.getEmail());
			user.setPassword(passwordEncoder.encode(request.getPassword()));

			if (user.getRoles() == null) {
				user.setRoles(new HashSet<>());
			}
			user.getRoles().add(Rol.ROL_USER);

			userRepository.save(user);
			String jwt = jwtService.generateToken(user);
			Set<String> roles = user.getAuthorities().stream().map(GrantedAuthority::getAuthority)
					.collect(Collectors.toSet());
			return JwtAuthenticationResponse.builder().token(jwt, roles).build();
		} catch (DataIntegrityViolationException ex) {
			throw new UsuarioDuplicadoException("El email ya existe.");
		}
	}

	@Override
	public JwtAuthenticationResponse signin(SigninRequest request) {
		try {
			// Maneja la autenticación
			Authentication authentication = authenticationManager
					.authenticate(new UsernamePasswordAuthenticationToken(request.getEmail(), request.getPassword()));

			Usuario user = userRepository.findByEmail(request.getEmail())
					.orElseThrow(() -> new UsuarioNoEncontradoException("Email o contraseña inválidos."));

			String jwt = jwtService.generateToken(user);
			Set<String> roles = user.getAuthorities().stream().map(GrantedAuthority::getAuthority)
					.collect(Collectors.toSet());
			return JwtAuthenticationResponse.builder().token(jwt, roles).build();
		} catch (Exception ex) {
			throw new UsuarioDatosNoValidosException("Email o contraseña inválidos.");
		}
	}
}
