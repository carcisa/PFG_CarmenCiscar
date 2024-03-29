package com.planazo.error.usuario;


public class UsuarioDatosNoValidosException extends RuntimeException {
	private static final long serialVersionUID = 1L;

	public UsuarioDatosNoValidosException(String mensaje) {
        super(mensaje);
    }
}
