package com.planazo.error.actividad;

public class ListaActividadesVaciaException extends RuntimeException {
	private static final long serialVersionUID = 1L;

	public ListaActividadesVaciaException(String message) {
        super(message);
    }
}
