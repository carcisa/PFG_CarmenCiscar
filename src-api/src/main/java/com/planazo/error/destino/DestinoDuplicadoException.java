package com.planazo.error.destino;

public class DestinoDuplicadoException extends RuntimeException {
	private static final long serialVersionUID = 1L;

	public DestinoDuplicadoException(String mensaje) {
        super(mensaje);
    }
}
