package com.planazo.DTO;

import com.planazo.entidad.Comentario;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

public class ComentarioDTO {
    private Integer id;
    private String titulo;
    private String descripcion;
    private Double puntuacion;
    private Integer usuarioId;
    private Integer actividadId;

    public ComentarioDTO() {
    }

    public ComentarioDTO(Comentario comentario) {
        this.id = comentario.getId();
        this.titulo = comentario.getTitulo();
        this.descripcion = comentario.getDescripcion();
        this.puntuacion = comentario.getPuntuacion();
        this.usuarioId = comentario.getUsuario().getId();
        this.actividadId = comentario.getActividad().getId();
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

    public Integer getUsuarioId() {
        return usuarioId;
    }

    public void setUsuarioId(Integer usuarioId) {
        this.usuarioId = usuarioId;
    }

    public Integer getActividadId() {
        return actividadId;
    }

    public void setActividadId(Integer actividadId) {
        this.actividadId = actividadId;
    }
}
