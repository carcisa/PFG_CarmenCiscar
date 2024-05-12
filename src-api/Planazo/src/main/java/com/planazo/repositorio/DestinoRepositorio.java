package com.planazo.repositorio;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.planazo.entidad.Destino;




@Repository
public interface DestinoRepositorio extends JpaRepository<Destino, Integer> {

	Optional<Destino> findById(Integer id);

	void deleteById(Integer id);
	
	Optional<Destino> findByNombre(String nombre);
}
