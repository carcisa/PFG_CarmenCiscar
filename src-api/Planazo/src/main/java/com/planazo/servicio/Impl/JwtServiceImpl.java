package com.planazo.servicio.Impl;

import java.security.Key;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.function.Function;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import com.planazo.servicio.JwtServicio;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;


/**
 * Servicio para manejar la generación y validación de tokens JWT.
 */
@Service
public class JwtServiceImpl implements JwtServicio {
   
	// Llave secreta usada para firmar los tokens JWT.
	@Value("${jwt.secret}")
    private String jwtSigningKey;// = "413F4428472B4B6250655368566D5970337336763979244226452948404D6351";

	/**
     * Extrae el nombre de usuario del token JWT.
     *
     * @param token El token JWT del cual extraer el nombre de usuario.
     * @return El nombre de usuario extraído del token.
     */
    @Override
    public String extractUserName(String token) {
        return extractClaim(token, Claims::getSubject);
    }

    /**
     * Genera un token JWT para un usuario específico.
     *
     * @param userDetails Los detalles del usuario para el cual generar el token.
     * @return Un nuevo token JWT.
     */
    @Override
    public String generateToken(UserDetails userDetails) {
        return generateToken(new HashMap<>(), userDetails);
    }

    /**
     * Valida un token JWT comparándolo con los detalles del usuario.
     *
     * @param token El token JWT a validar.
     * @param userDetails Los detalles del usuario contra los cuales validar el token.
     * @return Verdadero si el token es válido, falso en caso contrario.
     */
    @Override
    public boolean isTokenValid(String token, UserDetails userDetails) {
        final String userName = extractUserName(token);
        return (userName.equals(userDetails.getUsername())) && !isTokenExpired(token);
    }

    /**
     * Método privado para extraer información específica del token JWT.
     *
     * @param token El token JWT del cual extraer información.
     * @param claimsResolver Función que define qué información extraer del token.
     * @return La información extraída del token.
     */
    private <T> T extractClaim(String token, Function<Claims, T> claimsResolvers) {
        final Claims claims = extractAllClaims(token);
        return claimsResolvers.apply(claims);
    }

    /**
     * Genera un token JWT con reclamaciones adicionales para un usuario específico.
     *
     * @param extraClaims Reclamaciones adicionales para incluir en el token.
     * @param userDetails Los detalles del usuario para el cual generar el token.
     * @return Un nuevo token JWT.
     */
    private String generateToken(Map<String, Object> extraClaims, UserDetails userDetails) {
        return Jwts.builder()
                .setClaims(extraClaims)
                .setSubject(userDetails.getUsername())
                .setIssuedAt(new Date(System.currentTimeMillis()))
                .setExpiration(new Date(System.currentTimeMillis() + 1000 * 60 * 60 * 10)) 
                .signWith(getSigningKey(), SignatureAlgorithm.HS256)
                .compact();
    }

    /**
     * Verifica si un token JWT ha expirado.
     *
     * @param token El token JWT a verificar.
     * @return Verdadero si el token ha expirado, falso en caso contrario.
     */
    private boolean isTokenExpired(String token) {
        return extractExpiration(token).before(new Date());
    }

    /**
     * Extrae la fecha de expiración de un token JWT.
     *
     * @param token El token JWT del cual extraer la fecha de expiración.
     * @return La fecha de expiración del token.
     */
    private Date extractExpiration(String token) {
        return extractClaim(token, Claims::getExpiration);
    }


    /**
     * Extrae todas las reclamaciones de un token JWT.
     *
     * @param token El token JWT del cual extraer las reclamaciones.
     * @return Un objeto Claims que contiene todas las reclamaciones del token.
     */
    private Claims extractAllClaims(String token) {
        return Jwts.parserBuilder()
                .setSigningKey(getSigningKey())
                .build()
                .parseClaimsJws(token)
                .getBody();
    }

    /**
     * Obtiene la llave de firma para la verificación y generación de tokens JWT.
     *
     * @return La llave de firma.
     */
    private Key getSigningKey() {
        byte[] keyBytes = Decoders.BASE64.decode(jwtSigningKey);
        System.out.println("Longitud de la clave en bytes: " + keyBytes.length); // Solo para depuración
        if (keyBytes.length < 32) { // 256 bits = 32 bytes
            throw new IllegalArgumentException("La clave proporcionada es demasiado corta. Debe tener al menos 256 bits.");
        }
        return Keys.hmacShaKeyFor(keyBytes);
    }

        
    public void setJwtSigningKey(String jwtSigningKey) {
        this.jwtSigningKey = jwtSigningKey;
    }

    /**
     * Genera un token JWT con reclamaciones adicionales para un usuario específico
     * y una fecha de expiración personalizada.
     *
     * @param userDetails Los detalles del usuario para el cual generar el token.
     * @param expirationDate La fecha de expiración del token.
     * @return Un nuevo token JWT.
     */
    public String generateTokenWithCustomExpiration(UserDetails userDetails, Date expirationDate) {
        Map<String, Object> claims = new HashMap<>();
        return Jwts.builder()
                .setClaims(claims)
                .setSubject(userDetails.getUsername())
                .setIssuedAt(new Date(System.currentTimeMillis()))
                .setExpiration(expirationDate)
                .signWith(getSigningKey(), SignatureAlgorithm.HS256)
                .compact();
    }

	

}
