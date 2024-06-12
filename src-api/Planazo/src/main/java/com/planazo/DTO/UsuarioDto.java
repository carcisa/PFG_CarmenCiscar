package com.planazo.DTO;

import java.util.Set;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public class UsuarioDto {

	@NotBlank(message = "El nombre de usuario no puede estar vacío")
	private String nombreUsuario;
	
	@NotBlank(message = "El apellido de usuario no puede estar vacío")
	private String apellidoUsuario;

	@NotBlank(message = "El correo electrónico no puede estar vacío")
	@Email(message = "Formato de correo electrónico inválido")
	private String email;

	@Size(min = 8, message = "La contraseña debe tener al menos 8 caracteres")
	private String password;
	
	private Set<String> roles;
	
	

	public UsuarioDto() {

	}

	public UsuarioDto(@NotBlank(message = "El nombre de usuario no puede estar vacío") String nombreUsuario,
			@NotBlank(message = "El apellido de usuario no puede estar vacío") String apellidoUsuario,
			@NotBlank(message = "El correo electrónico no puede estar vacío") 
	        @Email(message = "Formato de correo electrónico inválido") String email,
			@Size(min = 8, message = "La contraseña debe tener al menos 8 caracteres") String password,
			Set<String> roles) {
		this.nombreUsuario = nombreUsuario;
		this.apellidoUsuario = apellidoUsuario;
		this.email = email;
		this.password = password;
		this.roles = roles;
	}
	
	

	public String getNombreUsuario() {
		return nombreUsuario;
	}

	public void setNombreUsuario(String nombreUsuario) {
		this.nombreUsuario = nombreUsuario;
	}
	
	public String getApellidoUsuario() {
		return apellidoUsuario;
	}

	public void setApellidoUsuario(String apellidoUsuario) {
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
	

    public Set<String> getRoles() {
        return roles;
    }

    public void setRoles(Set<String> roles) {
        this.roles = roles;
    }
	

}
