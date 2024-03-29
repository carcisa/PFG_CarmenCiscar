package com.planazo.request;

/**
 * Clase DTO para las solicitudes de inicio de sesión.
 * Contiene las credenciales necesarias para autenticar a un usuario, incluyendo el correo electrónico y la contraseña.
 */
public class SigninRequest {

    /**
     * El correo electrónico del usuario intentando iniciar sesión.
     */
    private String email;

    /**
     * La contraseña del usuario intentando iniciar sesión.
     */
    private String password;

    public SigninRequest(String string, String string2) {
		// TODO Auto-generated constructor stub
	}

	/**
     * Obtiene el correo electrónico del usuario.
     * 
     * @return El correo electrónico del usuario.
     */
    public String getEmail() {
        return email;
    }

    /**
     * Establece el correo electrónico del usuario.
     * 
     * @param email El nuevo correo electrónico del usuario.
     */
    public void setEmail(String email) {
        this.email = email;
    }

    /**
     * Obtiene la contraseña del usuario.
     * 
     * @return La contraseña del usuario.
     */
    public String getPassword() {
        return password;
    }

    /**
     * Establece la contraseña del usuario.
     * 
     * @param password La nueva contraseña del usuario.
     */
    public void setPassword(String password) {
        this.password = password;
    }
}
