package com.planazo.servicio.Impl;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.planazo.DTO.JwtAuthenticationResponse;
import com.planazo.entidad.Usuario;
import com.planazo.repositorio.UsuarioRepositorio;
import com.planazo.request.SignUpRequest;
import com.planazo.request.SigninRequest;
import com.planazo.servicio.AuthenticationServicio;
import com.planazo.servicio.JwtServicio;


/**
 * Implementación del servicio de autenticación, gestionando el registro y el inicio de sesión de los usuarios.
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
     * @param userRepository Repositorio de usuarios para operaciones de base de datos.
     * @param passwordEncoder Codificador de contraseñas para asegurar las contraseñas de los usuarios.
     * @param jwtService Servicio para la generación de tokens JWT.
     * @param authenticationManager Gestor de autenticación para Spring Security.
     */
    public AuthenticationServiceImpl(UsuarioRepositorio userRepository,
                                     PasswordEncoder passwordEncoder,
                                     JwtServicio jwtService,
                                     AuthenticationManager authenticationManager) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtService = jwtService;
        this.authenticationManager = authenticationManager;
    }

    @Override
    public JwtAuthenticationResponse signup(SignUpRequest request) {
        if(userRepository.existsByEmail(request.getEmail())) {
            throw new IllegalArgumentException("El email ya existe.");
        }
        // Corrige la forma de construir el objeto 'User'
        Usuario user = new Usuario();
        user.setNombreUsuario(request.getFirstName());
        user.setEmail(request.getEmail());
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        user.getRoles().add(com.planazo.entidad.Rol.ROL_USER); 
        userRepository.save(user);
        String jwt = jwtService.generateToken(user);
        return JwtAuthenticationResponse.builder().token(jwt).build();
    }

    @Override
    public JwtAuthenticationResponse signin(SigninRequest request) {
        // Maneja la autenticación
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(request.getEmail(), request.getPassword()));
        
       // SecurityContextHolder.getContext().setAuthentication(authentication);

        Usuario user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new IllegalArgumentException("Invalid email or password."));
        String jwt = jwtService.generateToken(user);
        return JwtAuthenticationResponse.builder().token(jwt).build();
    }
}
