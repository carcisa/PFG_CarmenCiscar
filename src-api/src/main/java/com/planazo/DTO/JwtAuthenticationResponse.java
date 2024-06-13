package com.planazo.DTO;
import java.util.Set;

/**
 * Clase que encapsula la respuesta de autenticación con un token JWT.
 * Se utiliza para enviar el token generado a los clientes tras una autenticación exitosa.
 */
public class JwtAuthenticationResponse {
    private String token; 
    private Set<String> roles;

   
    public JwtAuthenticationResponse(String token, Set<String> roles) {
        this.token = token;
        this.roles = roles;
    }
    
    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }
    
    public Set<String> getRoles() {
        return roles;
    }

    public void setRoles(Set<String> roles) {
        this.roles = roles;
    }

    public static JwtAuthenticationResponseBuilder builder() {
        return new JwtAuthenticationResponseBuilder();
    }

    
    public static class JwtAuthenticationResponseBuilder {
        private String token; 
		private Set<String> roles;

  
        public JwtAuthenticationResponseBuilder token(String token, Set<String> roles) {
            this.token = token;
            this.roles = roles;
            return this;
        }

        public JwtAuthenticationResponse build() {
            return new JwtAuthenticationResponse(token, roles);
        }
    }
}


