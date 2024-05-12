package com.planazo.repositorio;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.planazo.entidad.Actividad;


@Repository
public interface ActividadRepositorio extends JpaRepository<Actividad, Integer> {
	
	 @Query("SELECT AVG(c.puntuacion) FROM Comentario c WHERE c.actividad.id = :actividadId")
	    Double getPuntuacionPromedioPorActividadId(Integer actividadId);
	
}
