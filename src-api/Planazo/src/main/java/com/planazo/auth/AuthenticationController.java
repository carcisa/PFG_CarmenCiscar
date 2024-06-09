package com.planazo.auth;

import java.util.HashMap;
import java.util.Map;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.planazo.DTO.JwtAuthenticationResponse;
import com.planazo.DTO.UsuarioDto;
import com.planazo.error.usuario.UsuarioDatosNoValidosException;
import com.planazo.error.usuario.UsuarioDuplicadoException;
import com.planazo.error.usuario.UsuarioNoEncontradoException;
import com.planazo.request.SignUpRequest;
import com.planazo.request.SigninRequest;
import com.planazo.servicio.AuthenticationServicio;

import jakarta.validation.Valid;


/**
 * Controlador para manejar la autenticación de usuarios.
 * Proporciona endpoints para el registro (signup) y el inicio de sesión (signin) de usuarios.
 */
@RestController
@RequestMapping("/authenticate")
@Validated
public class AuthenticationController {
    private final AuthenticationServicio authenticationService;

    /**
     * Constructor para inyección de dependencias del servicio de autenticación.
     * 
     * @param authenticationService El servicio para manejar la autenticación de usuarios.
     */
    @Autowired
    public AuthenticationController(AuthenticationServicio authenticationService) {
        this.authenticationService = authenticationService;
    }

    /**
     * Endpoint para registrar un nuevo usuario en el sistema.
     * 
     * @param request Los detalles del usuario para el registro.
     * @return JwtAuthenticationResponse que contiene el token JWT generado tras el registro exitoso.
     */
    @PostMapping("/signup")
    public ResponseEntity<JwtAuthenticationResponse> signup(@Valid @RequestBody SignUpRequest request, UsuarioDto usuarioDto) {
    	 if (usuarioDto.getRoles() == null || usuarioDto.getRoles().isEmpty()) {
             usuarioDto.setRoles(Set.of("ROL_USER"));  
         }
        JwtAuthenticationResponse response = authenticationService.signup(request);
        return ResponseEntity.ok(response);
    }

    /**
     * Endpoint para iniciar sesión en el sistema.
     * 
     * @param request Los detalles del usuario para el inicio de sesión.
     * @return JwtAuthenticationResponse que contiene el token JWT generado tras el inicio de sesión exitoso.
     */
    @PostMapping("/signin")
    public ResponseEntity<JwtAuthenticationResponse> signin(@RequestBody SigninRequest request) {
        JwtAuthenticationResponse response = authenticationService.signin(request);
        return ResponseEntity.ok(response);
    }
    
    @ExceptionHandler(UsuarioDuplicadoException.class)
    public ResponseEntity<Map<String, String>> handleUsuarioDuplicadoException(UsuarioDuplicadoException ex) {
        Map<String, String> errorResponse = new HashMap<>();
        errorResponse.put("message", ex.getMessage());
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(errorResponse);
    }

    @ExceptionHandler(UsuarioNoEncontradoException.class)
    public ResponseEntity<Map<String, String>> handleUsuarioNoEncontradoException(UsuarioNoEncontradoException ex) {
        Map<String, String> errorResponse = new HashMap<>();
        errorResponse.put("message", ex.getMessage());
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(errorResponse);
    }

    @ExceptionHandler(UsuarioDatosNoValidosException.class)
    public ResponseEntity<Map<String, String>> handleUsuarioDatosNoValidosException(UsuarioDatosNoValidosException ex) {
        Map<String, String> errorResponse = new HashMap<>();
        errorResponse.put("message", ex.getMessage());
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(errorResponse);
    }

    @ExceptionHandler(DataIntegrityViolationException.class)
    public ResponseEntity<Map<String, String>> handleDataIntegrityViolationException(DataIntegrityViolationException ex) {
        Map<String, String> errorResponse = new HashMap<>();
        errorResponse.put("message", "El email ya existe.");
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(errorResponse);
    }
}
