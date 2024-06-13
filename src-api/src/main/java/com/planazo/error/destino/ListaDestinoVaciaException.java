package com.planazo.error.destino;

public class ListaDestinoVaciaException extends RuntimeException {
	private static final long serialVersionUID = 1L;

	public ListaDestinoVaciaException(String message) {
        super(message);
    }
}