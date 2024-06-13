package com.planazo.error.actividad;


public class ActividadNoEncontradaException extends RuntimeException {
	private static final long serialVersionUID = 1L;

	public ActividadNoEncontradaException(String mensaje) {
        super(mensaje);
    }
}
