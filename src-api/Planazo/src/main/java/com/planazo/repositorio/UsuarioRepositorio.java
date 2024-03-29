package com.planazo.repositorio;

import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.planazo.entidad.Usuario;


/**
 * Repositorio JPA para la entidad Usuario.
 * Proporciona métodos automáticos y personalizados para operaciones CRUD y consultas sobre usuarios.
 */
@Repository
public interface UsuarioRepositorio extends JpaRepository<Usuario, Integer> {

    /**
     * Busca un usuario por su nombre de usuario.
     * 
     * @param username El nombre de usuario del usuario a buscar.
     * @return Un Optional conteniendo el usuario encontrado, o un Optional vacío si no se encontró ninguno.
     */
    Optional<Usuario> findByNombreUsuario(String username);

    /**
     * Verifica si existe un usuario con el nombre de usuario especificado.
     * 
     * @param username El nombre de usuario a verificar.
     * @return Verdadero si existe un usuario con el nombre de usuario, falso en caso contrario.
     */
    Boolean existsByNombreUsuario(String username);

    /**
     * Busca un usuario por su correo electrónico.
     * 
     * @param email El correo electrónico del usuario a buscar.
     * @return Un Optional conteniendo el usuario encontrado, o un Optional vacío si no se encontró ninguno.
     */
    Optional<Usuario> findByEmail(String email);

    /**
     * Verifica si existe un usuario con el correo electrónico especificado.
     * 
     * @param email El correo electrónico a verificar.
     * @return Verdadero si existe un usuario con el correo electrónico, falso en caso contrario.
     */
    Boolean existsByEmail(String email);
}
