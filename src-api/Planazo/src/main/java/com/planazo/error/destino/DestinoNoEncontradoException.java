package com.planazo.error.destino;


public class DestinoNoEncontradoException extends RuntimeException {
	private static final long serialVersionUID = 1L;

	public DestinoNoEncontradoException(String mensaje) {
        super(mensaje);
    }
}
