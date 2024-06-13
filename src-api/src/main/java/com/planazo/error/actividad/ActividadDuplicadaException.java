package com.planazo.error.actividad;

public class ActividadDuplicadaException extends RuntimeException {
	private static final long serialVersionUID = 1L;

	public ActividadDuplicadaException(String mensaje) {
        super(mensaje);
    }
}
