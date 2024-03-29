package com.planazo.error.destino;

public class DestinoDatosNoValidosException extends RuntimeException {
	private static final long serialVersionUID = 1L;

	public DestinoDatosNoValidosException(String mensaje) {
        super(mensaje);
    }
}
