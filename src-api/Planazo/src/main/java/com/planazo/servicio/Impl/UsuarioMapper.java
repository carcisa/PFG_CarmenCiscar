package com.planazo.servicio.Impl;

import org.springframework.stereotype.Service;

import com.planazo.DTO.UsuarioDto;
import com.planazo.entidad.Usuario;

@Service
public class UsuarioMapper {

    public Usuario toEntity(UsuarioDto dto) {
        Usuario usuario = new Usuario();
        usuario.setNombreUsuario(dto.getNombreUsuario());
        usuario.setApellidoUsuario(dto.getApellidoUsuario());
        usuario.setEmail(dto.getEmail());
        usuario.setPassword(dto.getPassword());
        return usuario;
    }

    public UsuarioDto toDto(Usuario entity) {
        UsuarioDto dto = new UsuarioDto();
        dto.setNombreUsuario(entity.getNombreUsuario());
        dto.setApellidoUsuario(entity.getApellidoUsuario());
        dto.setEmail(entity.getEmail());
        dto.setPassword(entity.getPassword());
        return dto;
    }
}
