package com.planazo.entidad;

import java.util.ArrayList;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

/**
 * La clase Actividad representa una entidad de actividad turística mapeada a la
 * tabla 'actividades' en la base de datos. Incluye detalles como el nombre,
 * descripción, categoría, dirección, y su destino asociado.
 */
@Entity
@Table(name = "actividad")
public class Actividad {

	/**
	 * Identificador único de la actividad, generado automáticamente.
	 */
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer id;

	/**
	 * Nombre de la actividad. No puede ser nulo.
	 */
	@NotBlank(message = "El nombre no puede estar vacío")
	@Column(nullable = false)
	private String nombre;

	/**
	 * Descripción detallada de la actividad. Máximo 1000 caracteres.
	 */
	@Size(max = 1000, message = "La descripción no puede superar los 1000 caracteres")
	@Column(length = 1000)
	private String descripcion;

	/**
	 * Categoría de la actividad, representada por un enum. No puede ser nulo.
	 */
	@Column(nullable = false)
	@Enumerated(EnumType.STRING)
	@NotNull(message = "La categoría no puede ser nula")
	private Categoria categoria;

	/**
	 * Puntuación de la actividad. No puede ser nulo.
	 */
	@NotNull
    @Min(0)
    @Max(5)
    private Double puntuacion;

	/**
	 * Dirección física de la actividad.
	 */
	@Column
	private String direccion;

	/**
	 * Horario de la actividad.
	 */
	@Column
	private String horario;

	/**
	 * Imagen de la actividad. No puede ser nulo.
	 */
	@NotBlank(message = "El src de la actividad no puede estar vacío")
	@Column(nullable = false)
	private String imagen;

	/**
	 * Destino asociado a la actividad. Se utiliza la anotación JsonBackReference
	 * para manejar la referencia inversa y evitar la recursión infinita en la
	 * serialización JSON.
	 */
	@NotNull(message = "Debe existir un destino asociado")
	@ManyToOne
	@JoinColumn(name = "destino_id", nullable = false)
	@JsonBackReference
	private Destino destino;

	@OneToMany(mappedBy = "actividad", orphanRemoval = true)
	private List<Comentario> comentarios = new ArrayList<>();

	/**
	 * Constructor por defecto.
	 * 
	 */
	public Actividad() {

	}

	public Actividad(Integer id) {
        this.id = id;
    }

	public Actividad(Integer id, @NotBlank(message = "El nombre no puede estar vacío") String nombre,
			@Size(max = 1000, message = "La descripción no puede superar los 1000 caracteres") String descripcion,
			@NotNull(message = "La categoría no puede ser nula") Categoria categoria,
			@NotBlank(message = "La puntuación no puede estar vacía") Double puntuacion, String direccion,
			String horario, @NotBlank(message = "El src de la actividad no puede estar vacío") String imagen,
			@NotNull(message = "Debe existir un destino asociado") Destino destino, List<Comentario> comentarios) {
		super();
		this.id = id;
		this.nombre = nombre;
		this.descripcion = descripcion;
		this.categoria = categoria;
		this.puntuacion = puntuacion;
		this.direccion = direccion;
		this.horario = horario;
		this.imagen = imagen;
		this.destino = destino;
		this.comentarios = comentarios;
	}



	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public String getNombre() {
		return nombre;
	}

	public void setNombre(String nombre) {
		this.nombre = nombre;
	}

	public String getDescripcion() {
		return descripcion;
	}

	public void setDescripcion(String descripcion) {
		this.descripcion = descripcion;
	}

	public Categoria getCategoria() {
		return categoria;
	}

	public void setCategoria(Categoria categoria) {
		this.categoria = categoria;
	}

	public String getDireccion() {
		return direccion;
	}

	public void setDireccion(String direccion) {
		this.direccion = direccion;
	}

	public Double getPuntuacion() {
		return puntuacion;
	}

	public void setPuntuacion(Double puntuacion) {
		this.puntuacion = puntuacion;
	}

	public String getHorario() {
		return horario;
	}

	public void setHorario(String horario) {
		this.horario = horario;
	}

	public String getImagen() {
		return imagen;
	}

	public void setImagen(String imagen) {
		this.imagen = imagen;
	}

	public Destino getDestino() {
		return destino;
	}

	public void setDestino(Destino destino) {
		this.destino = destino;
	}

	public List<Comentario> getComentarios() {
		return comentarios;
	}

	public void setComentarios(List<Comentario> comentarios) {
		this.comentarios = comentarios;
	}

	

	// Métodos para agregar y eliminar comentarios
	public void agregarComentario(Comentario comentario) {
		comentarios.add(comentario);
		comentario.setActividad(this);
	}

	public void eliminarComentario(Comentario comentario) {
		comentarios.remove(comentario);
		comentario.setActividad(null);
	}

	@Override
	public String toString() {
		return "Actividad [getId()=" + getId() + ", getNombre()=" + getNombre() + ", getDescripcion()="
				+ getDescripcion() + ", getCategoria()=" + getCategoria() + ", getDireccion()=" + getDireccion()
				+ ", getDestino()=" + getDestino() + "]";
	}

}
