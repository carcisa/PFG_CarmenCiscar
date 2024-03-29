package com.planazo.DTO;

/**
 * Clase que encapsula la respuesta de autenticación con un token JWT.
 * Se utiliza para enviar el token generado a los clientes tras una autenticación exitosa.
 */
public class JwtAuthenticationResponse {
    private String token; // El token JWT

    /**
     * Constructor que inicializa una nueva instancia de JwtAuthenticationResponse con un token.
     *
     * @param token El token JWT como cadena de texto.
     */
    public JwtAuthenticationResponse(String token) {
        this.token = token;
    }

    /**
     * Obtiene el token JWT contenido en esta respuesta de autenticación.
     *
     * @return El token JWT como cadena de texto.
     */
    public String getToken() {
        return token;
    }

    /**
     * Establece o actualiza el token JWT en esta respuesta de autenticación.
     *
     * @param token El nuevo token JWT como cadena de texto.
     */
    public void setToken(String token) {
        this.token = token;
    }

    /**
     * Proporciona una instancia del constructor de la respuesta de autenticación JWT.
     * 
     * @return Una nueva instancia de JwtAuthenticationResponseBuilder para construir una respuesta de autenticación JWT.
     */
    public static JwtAuthenticationResponseBuilder builder() {
        return new JwtAuthenticationResponseBuilder();
    }

    /**
     * Clase constructora para JwtAuthenticationResponse.
     * Permite una construcción fluida y fácil del objeto JwtAuthenticationResponse.
     */
    public static class JwtAuthenticationResponseBuilder {
        private String token; // El token JWT a ser construido

        /**
         * Establece el token para el objeto JwtAuthenticationResponse que está siendo construido.
         *
         * @param token El token JWT como cadena de texto.
         * @return La instancia del constructor para encadenar llamadas.
         */
        public JwtAuthenticationResponseBuilder token(String token) {
            this.token = token;
            return this;
        }

        /**
         * Construye y retorna una nueva instancia de JwtAuthenticationResponse con el token configurado.
         *
         * @return Una nueva instancia de JwtAuthenticationResponse con el token establecido.
         */
        public JwtAuthenticationResponse build() {
            return new JwtAuthenticationResponse(token);
        }
    }
}

