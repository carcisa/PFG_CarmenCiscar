package com.planazo.request;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

/**
 * Clase DTO para las solicitudes de registro de usuarios.
 * Almacena la información necesaria para registrar un nuevo usuario, incluyendo nombre, apellido, correo electrónico y contraseña.
 */
public class SignUpRequest {

    @NotBlank(message = "El primer nombre no puede estar vacío")
    private String nombreUsuario;

    @NotBlank(message = "El apellido no puede estar vacío")
    private String apellidoUsuario;

    @NotBlank(message = "El correo electrónico no puede estar vacío")
    @Email(message = "Formato de correo electrónico inválido")
    private String email;

    @Size(min = 8, message = "La contraseña debe tener al menos 8 caracteres")
    private String password;

    public SignUpRequest() {}

    public SignUpRequest(String nombreUsuario, String apellidoUsuario, String email, String password) {
        this.nombreUsuario = nombreUsuario;
        this.apellidoUsuario = apellidoUsuario;
        this.email = email;
        this.password = password;
    }

    public String getnombreUsuario() {
        return nombreUsuario;
    }

    public void setnombreUsuario(String nombreUsuario) {
        this.nombreUsuario = nombreUsuario;
    }

    public String getapellidoUsuario() {
        return apellidoUsuario;
    }

    public void setapellidoUsuario(String apellidoUsuario) {
        this.apellidoUsuario = apellidoUsuario;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }
}
