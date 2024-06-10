package com.planazo.entidad;

import java.util.Collection;
import java.util.HashSet;
import java.util.Set;
import java.util.stream.Collectors;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import jakarta.persistence.CollectionTable;
import jakarta.persistence.Column;
import jakarta.persistence.ElementCollection;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.Table;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

/**
 * La clase Usuario representa un usuario de la aplicación, implementando la interfaz UserDetails para integrarse con Spring Security.
 * Mapea la entidad a la tabla 'usuario' en la base de datos y gestiona los roles de seguridad.
 */
@Entity
@Table(name = "usuario")
public class Usuario implements UserDetails {

    private static final long serialVersionUID = 1L;

    /**
     * Identificador único del usuario, generado automáticamente.
     */
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    /**
     * Nombre de usuario,  no nulo.
     */
    @Column(name = "nombre", nullable = false)
    @NotBlank(message = "El nombre de usuario no puede estar vacío")
    private String nombreUsuario;
    
    /**
     * Apellido de usuario, no nulo.
     */
    @Column(name = "apellido", nullable = false)
    @NotBlank(message = "El apellido de usuario no puede estar vacío")
    private String apellidoUsuario;

    /**
     * Correo electrónico del usuario, único y no nulo.
     */
    @Column(name = "email", nullable = false, unique = true)
    @NotBlank(message = "El correo electrónico no puede estar vacío")
	@Email(message = "Formato de correo electrónico inválido")
    private String email;

    /**
     * Contraseña del usuario, no nula.
     */
    @Column(nullable = false)
	@Size(min = 8, message = "La contraseña debe tener al menos 8 caracteres")
    private String password;
    
    @ManyToMany
    @JoinTable(
      name = "usuario_actividad_favorita", 
      joinColumns = @JoinColumn(name = "usuario_id"), 
      inverseJoinColumns = @JoinColumn(name = "actividad_id"))
    private Set<Actividad> actividadesFavoritas = new HashSet<>();

    /**
     * Roles de seguridad asignados al usuario, representados por el enum Role.
     * Se cargan con estrategia EAGER para disponibilidad inmediata.
     */
    @ElementCollection(targetClass = Rol.class, fetch = FetchType.EAGER)
    @Enumerated(EnumType.STRING)
    @CollectionTable(name = "usuario_rol")
    @Column(name = "rol")
    private Set<Rol> rol;
    
    /**
     * Constructor por defecto.
     */
    public Usuario() {
    }

    /**
     * Constructor para crear un nuevo usuario con nombre de usuario, correo electrónico y contraseña.
     * @param nombreUsuario El nombre de usuario, debe ser único.
     * @param correoElectronico El correo electrónico del usuario, debe ser único.
     * @param password La contraseña del usuario.
     */
    public Usuario(String nombreUsuario,String apellidoUsuario, String correoElectronico, String password) {
        this.nombreUsuario = nombreUsuario;
        this.apellidoUsuario = apellidoUsuario;
        this.email = correoElectronico;
        this.password = password;
    }
    
    public Usuario(Integer id) {
        this.id = id;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
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

	public static long getSerialversionuid() {
		return serialVersionUID;
	}

	public String getPassword() {
        return password;
    }

    public void setPassword(String contraseña) {
        this.password = contraseña;
    }
    
    public Set<Actividad> getActividadesFavoritas() {
        return actividadesFavoritas;
    }

    public void setActividadesFavoritas(Set<Actividad> actividadesFavoritas) {
        this.actividadesFavoritas = actividadesFavoritas;
    }
    
   

	public Set<Rol> getRoles() {
		return rol;
	}

	public void setRoles(Set<Rol> roleUser) {
		this.rol = roleUser;
	}

	@Override
    public String toString() {
        return "Usuario{" +
               "id=" + id +
               ", nombreUsuario='" + nombreUsuario + '\'' +
               ", email='" + email + '\'' +
               ", contraseña='" + password + '\'' +
               '}';
    }

	/**
     * Método para obtener las autoridades de seguridad del usuario, convertidas de roles a GrantedAuthority.
     * @return Colección de GrantedAuthority representando los roles del usuario.
     */
	@Override
	public Collection<? extends GrantedAuthority> getAuthorities() {
		Collection<GrantedAuthority> authorities = rol.stream()
		        .map(role -> new SimpleGrantedAuthority(role.name()))
		        .collect(Collectors.toList());
		    
		    return authorities;	
	}

	@Override
	public String getUsername() {
		return email;
	}

	@Override
	public boolean isAccountNonExpired() {
		return true;
	}

	@Override
	public boolean isAccountNonLocked() {
		return true;
	}

	@Override
	public boolean isCredentialsNonExpired() {
		return true;
	}

	@Override
	public boolean isEnabled() {
		return true;
	}

	public void agregarActividad(Actividad actividad) {
		actividadesFavoritas.add(actividad);
	}
	
	
}