package com.planazo.entidad;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import jakarta.validation.constraints.DecimalMax;
import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

/**
 * La clase Comentario representa un comentario realizado por un usuario a una actividad,
 * incluyendo una puntuación y descripción del mismo.
 */
@Entity
@Table(name = "comentario")
public class Comentario {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @NotBlank(message = "El título no puede estar vacío")
    @Column(nullable = false)
    private String titulo;

    @NotBlank(message = "La descripción no puede estar vacía")
    @Size(max = 1000, message = "La descripción no puede superar los 1000 caracteres")
    @Column(nullable = false, length = 1000)
    private String descripcion;

    @NotNull(message = "La puntuación no puede ser nula")
    @DecimalMin(value = "1.0", message = "La puntuación mínima es 1.0")
    @DecimalMax(value = "5.0", message = "La puntuación máxima es 5.0")
    @Column(nullable = false)
    private Double puntuacion;

    @NotNull(message = "Debe existir un usuario asociado")
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "usuario_id", nullable = false)
    @JsonBackReference
    private Usuario usuario;

    @NotNull(message = "Debe existir una actividad asociada")
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "actividad_id", nullable = false)
    @JsonIgnore
    private Actividad actividad;

 
    public Comentario() {
    }
    
    
    

    public Comentario(Integer id, @NotBlank(message = "El título no puede estar vacío") String titulo,
			@NotBlank(message = "La descripción no puede estar vacía") @Size(max = 1000, message = "La descripción no puede superar los 1000 caracteres") String descripcion,
			@NotNull(message = "La puntuación no puede ser nula") @DecimalMin(value = "1.0", message = "La puntuación mínima es 1.0") @DecimalMax(value = "5.0", message = "La puntuación máxima es 5.0") Double puntuacion,
			@NotNull(message = "Debe existir un usuario asociado") Usuario usuario,
			@NotNull(message = "Debe existir una actividad asociada") Actividad actividad) {
		super();
		this.id = id;
		this.titulo = titulo;
		this.descripcion = descripcion;
		this.puntuacion = puntuacion;
		this.usuario = usuario;
		this.actividad = actividad;
	}




	// Getters y setters
    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getTitulo() {
        return titulo;
    }

    public void setTitulo(String titulo) {
        this.titulo = titulo;
    }

    public String getDescripcion() {
        return descripcion;
    }

    public void setDescripcion(String descripcion) {
        this.descripcion = descripcion;
    }

    public Double getPuntuacion() {
        return puntuacion;
    }

    public void setPuntuacion(Double puntuacion) {
        this.puntuacion = puntuacion;
    }

    public Usuario getUsuario() {
        return usuario;
    }

    public void setUsuario(Usuario usuario) {
        this.usuario = usuario;
    }

    public Actividad getActividad() {
        return actividad;
    }

    public void setActividad(Actividad actividad) {
        this.actividad = actividad;
    }

    // Método toString()
    @Override
    public String toString() {
        return "Comentario{" +
               "id=" + id +
               ", titulo='" + titulo + '\'' +
               ", descripcion='" + descripcion + '\'' +
               ", puntuacion=" + puntuacion +
               ", usuario=" + usuario +
               ", actividad=" + actividad +
               '}';
    }
}
