package com.planazo.request;

/**
 * Clase DTO para las solicitudes de registro de usuarios.
 * Almacena la información necesaria para registrar un nuevo usuario, incluyendo nombre, apellido, correo electrónico y contraseña.
 */
public class SignUpRequest {
    /**
     * Primer nombre del usuario a registrar.
     */
    private String firstName;

    /**
     * Apellido del usuario a registrar.
     */
    private String lastName;

    /**
     * Correo electrónico del usuario a registrar.
     */
    private String email;

    /**
     * Contraseña elegida por el usuario a registrar.
     */
    private String password;
    
    public SignUpRequest() {
    }

    public SignUpRequest(String string, String string2, String string3, String string4) {
	}

	/**
     * Obtiene el primer nombre del usuario.
     * 
     * @return El primer nombre del usuario.
     */
    public String getFirstName() {
        return firstName;
    }

    /**
     * Establece el primer nombre del usuario.
     * 
     * @param firstName El primer nombre a establecer.
     */
    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    /**
     * Obtiene el apellido del usuario.
     * 
     * @return El apellido del usuario.
     */
    public String getLastName() {
        return lastName;
    }

    /**
     * Establece el apellido del usuario.
     * 
     * @param lastName El apellido a establecer.
     */
    public void setLastName(String lastName) {
        this.lastName = lastName;
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
     * @param email El correo electrónico a establecer.
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
     * @param password La contraseña a establecer.
     */
    public void setPassword(String password) {
        this.password = password;
    }
}
