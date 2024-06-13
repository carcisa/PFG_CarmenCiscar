package com.planazo.error.actividad;

public class ActividadDatosNoValidosException extends RuntimeException {
	private static final long serialVersionUID = 1L;

	public ActividadDatosNoValidosException(String mensaje) {
        super(mensaje);
    }
}
