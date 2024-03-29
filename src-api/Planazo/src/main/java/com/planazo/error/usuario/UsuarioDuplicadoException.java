package com.planazo.error.usuario;

public class UsuarioDuplicadoException extends RuntimeException {
	private static final long serialVersionUID = 1L;

	public UsuarioDuplicadoException(String mensaje) {
        super(mensaje);
    }
}
