package com.planazo.DTO;

import java.util.Set;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public class UsuarioDto {

	@NotBlank(message = "El nombre de usuario no puede estar vacío")
	private String nombreUsuario;

	@NotBlank(message = "El correo electrónico no puede estar vacío")
	@Email(message = "Formato de correo electrónico inválido")
	private String email;

	@Size(min = 8, message = "La contraseña debe tener al menos 8 caracteres")
	private String password;
	
	private Set<String> roles;
	
	

	public UsuarioDto() {

	}

	public UsuarioDto(@NotBlank(message = "El nombre de usuario no puede estar vacío") String nombreUsuario,
			@NotBlank(message = "El correo electrónico no puede estar vacío") 
	        @Email(message = "Formato de correo electrónico inválido") String email,
			@Size(min = 8, message = "La contraseña debe tener al menos 8 caracteres") String password) {
		this.nombreUsuario = nombreUsuario;
		this.email = email;
		this.password = password;
	}
	
	

	public String getNombreUsuario() {
		return nombreUsuario;
	}

	public void setNombreUsuario(String nombreUsuario) {
		this.nombreUsuario = nombreUsuario;
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
	

    public Set<String> getRoles() {
        return roles;
    }

    public void setRoles(Set<String> roles) {
        this.roles = roles;
    }
	

}
