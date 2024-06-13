package com.planazo.entidad;




import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonManagedReference;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotBlank;

/**
 * La clase Destino representa un destino turístico, mapeado a la tabla 'destinos' en la base de datos.
 * Contiene información básica sobre el destino, como su nombre y descripción, además de una lista de actividades asociadas.
 */
@Entity
@Table(name = "destino")
public class Destino {

    /**
     * Identificador único del destino, generado automáticamente.
     */
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    /**
     * Nombre del destino. No puede ser nulo.
     */
    @NotBlank(message = "El nombre del destino no puede estar vacío")
    @Column(nullable = false)
    private String nombre;
    
    
    /**
     * Imagen del destino. No puede ser nulo.
     */
    @NotBlank(message = "El src del destino no puede estar vacío")
    @Column(nullable = false)
    private String imagen;



    /**
     * Lista de actividades asociadas al destino. La relación es bidireccional y se maneja automáticamente
     * la referencia inversa en la serialización JSON para evitar la recursión infinita.
     */
    @OneToMany(mappedBy = "destino", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Actividad> actividades;

    /**
     * Constructor por defecto.
     */
    public Destino() {
    }

    /**
     * Constructor completo con todos los atributos, incluyendo la lista de actividades.
     * @param id Identificador del destino.
     * @param nombre Nombre del destino.
     * @param descripcion Descripción del destino.
     * @param actividades Lista de actividades asociadas al destino.
     */
    public Destino(Integer id, String nombre,String imagen, List<Actividad> actividades) {
        this.id = id;
        this.nombre = nombre;
        this.imagen = imagen;
        this.actividades = actividades;
    }

    /**
     * Constructor sobrecargado sin el identificador, útil para la creación de nuevos destinos.
     * @param nombre Nombre del destino.
     * @param descripcion Descripción del destino.
     */
    public Destino(String nombre) {
        this.nombre = nombre;
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
	
	
	public String getImagen() {
		return imagen;
	}

	public void setImagen(String imagen) {
		this.imagen = imagen;
	}

	public List<Actividad> getActividades() {
		return actividades;
	}



	public void setActividades(List<Actividad> actividades) {
		this.actividades = actividades;
	}
	
	 /**
     * Agrega una actividad a la lista de actividades del destino y establece la relación inversa.
     * @param actividad La actividad a agregar.
     */
    public void agregarActividad(Actividad actividad) {
        actividad.setDestino(this);
        actividades.add(actividad);
    }
  
}