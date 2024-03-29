package com.planazo.configuracion;

import java.io.IOException;

import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.lang.NonNull;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import com.planazo.servicio.JwtServicio;
import com.planazo.servicio.UsuarioServicio;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;

/**
 * Filtro de autenticación JWT que se ejecuta una vez por solicitud. Este filtro
 * verifica la presencia de un token JWT en las cabeceras de las solicitudes
 * entrantes, valida el token y establece la autenticación en el contexto de
 * seguridad de Spring si el token es válido.
 */
@Component
@RequiredArgsConstructor
public class JwtAuthenticationFilter extends OncePerRequestFilter {

	@Autowired
	private JwtServicio jwtService;
	@Autowired
	private UsuarioServicio usuarioService;

	/**
	 * Constructor para inyección de dependencias.
	 * 
	 * @param jwtService     Servicio para operaciones relacionadas con JWT.
	 * @param usuarioService Servicio para operaciones relacionadas con usuarios.
	 */
	public JwtAuthenticationFilter(JwtServicio jwtService, UsuarioServicio usuarioService) {
		this.jwtService = jwtService;
		this.usuarioService = usuarioService;
	}

	/**
	 * Implementación del filtro que ejecuta la lógica de autenticación JWT. Extrae
	 * el token JWT de la cabecera 'Authorization', valida el token, y autentica al
	 * usuario en el contexto de seguridad de Spring si el token es válido.
	 * 
	 * @param request     La solicitud HTTP entrante.
	 * @param response    La respuesta HTTP a ser enviada.
	 * @param filterChain La cadena de filtros que se está procesando.
	 * @throws ServletException Si ocurre un error de servlet.
	 * @throws IOException      Si ocurre un error de entrada/salida.
	 */
	@Override
	protected void doFilterInternal(@NonNull HttpServletRequest request, @NonNull HttpServletResponse response,
			@NonNull FilterChain filterChain) throws ServletException, IOException {
		final String authHeader = request.getHeader("Authorization");
		final String jwt;
		final String userEmail;
		if (StringUtils.isEmpty(authHeader) || !StringUtils.startsWith(authHeader, "Bearer ")) {
			filterChain.doFilter(request, response);
			return;
		}
		jwt = authHeader.substring(7);
		userEmail = jwtService.extractUserName(jwt);
		if (StringUtils.isNotEmpty(userEmail) && SecurityContextHolder.getContext().getAuthentication() == null) {
			UserDetails userDetails = usuarioService.userDetailsService().loadUserByUsername(userEmail);
			if (jwtService.isTokenValid(jwt, userDetails)) {
				SecurityContext context = SecurityContextHolder.createEmptyContext();
				UsernamePasswordAuthenticationToken authToken = new UsernamePasswordAuthenticationToken(userDetails,
						null, userDetails.getAuthorities());
				authToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
				context.setAuthentication(authToken);
				SecurityContextHolder.setContext(context);
			}
		}
		filterChain.doFilter(request, response);
	}
}