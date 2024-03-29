package com.planazo.error;

import java.util.Date;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.context.request.WebRequest;

import com.planazo.error.actividad.ActividadDatosNoValidosException;
import com.planazo.error.actividad.ActividadDuplicadaException;
import com.planazo.error.actividad.ActividadNoEncontradaException;
import com.planazo.error.actividad.ListaActividadesVaciaException;
import com.planazo.error.destino.DestinoDatosNoValidosException;
import com.planazo.error.destino.DestinoDuplicadoException;
import com.planazo.error.destino.DestinoNoEncontradoException;
import com.planazo.error.destino.ListaDestinoVaciaException;
import com.planazo.error.usuario.ListaUsuariosVaciaException;
import com.planazo.error.usuario.UsuarioDatosNoValidosException;
import com.planazo.error.usuario.UsuarioDuplicadoException;
import com.planazo.error.usuario.UsuarioNoEncontradoException;





@ControllerAdvice
public class GlobalExceptionHandler {
	/**
     * #############################################
     * #       BAD_REQUEST. 400 EXCEPTION          ##
     * ##############################################
     */
	 @ExceptionHandler(IllegalArgumentException.class)
	    public ResponseEntity<ErrorDetailsResponse> handleIllegalArgumentException(IllegalArgumentException ex, WebRequest request) {
		 ErrorDetailsResponse errorDetails = new ErrorDetailsResponse(
	            new Date(),
	            ex.getMessage(),
	            request.getDescription(false));
	        return new ResponseEntity<>(errorDetails, HttpStatus.BAD_REQUEST);
	    }
    
    
    /**
     * ####################################################
     * #       "Lista de Usuarios vacía" Exception 404    ##
     * #####################################################
     * @param ex La excepción que fue lanzada.
     * @param request La solicitud web actual.
     * @return Un objeto ResponseEntity que contiene los detalles del error.
     */
    @ExceptionHandler(ListaUsuariosVaciaException.class)
    public ResponseEntity<ErrorDetailsResponse> manejarListaUsuariosVaciaException(ListaUsuariosVaciaException ex, WebRequest request) {
        ErrorDetailsResponse errorDetails = new ErrorDetailsResponse(
                new Date(),
                ex.getMessage(),
                request.getDescription(false));

        return new ResponseEntity<>(errorDetails, HttpStatus.NOT_FOUND);
    }
    
    /**
     * ####################################################
     * #       "Lista de Destino vacía" Exception 404    ##
     * #####################################################
     * @param ex La excepción que fue lanzada.
     * @param request La solicitud web actual.
     * @return Un objeto ResponseEntity que contiene los detalles del error.
     */
    @ExceptionHandler(ListaDestinoVaciaException.class)
    public ResponseEntity<ErrorDetailsResponse> manejarListaDestinoVaciaException(ListaDestinoVaciaException ex, WebRequest request) {
        ErrorDetailsResponse errorDetails = new ErrorDetailsResponse(
                new Date(),
                ex.getMessage(),
                request.getDescription(false));

        return new ResponseEntity<>(errorDetails, HttpStatus.NOT_FOUND);
    }
    
    /**
     * ####################################################
     * #       "Lista de Actividades vacía" Exception 404    ##
     * #####################################################
     * @param ex La excepción que fue lanzada.
     * @param request La solicitud web actual.
     * @return Un objeto ResponseEntity que contiene los detalles del error.
     */
    @ExceptionHandler(ListaActividadesVaciaException.class)
    public ResponseEntity<ErrorDetailsResponse> manejarListaActividadesVaciaException(ListaActividadesVaciaException ex, WebRequest request) {
        ErrorDetailsResponse errorDetails = new ErrorDetailsResponse(
                new Date(),
                ex.getMessage(),
                request.getDescription(false));

        return new ResponseEntity<>(errorDetails, HttpStatus.NOT_FOUND);
    }
    
    /**
     * ####################################################
     * #       Excepción 404: "Usuario no encontrado"   ##
     * ####################################################
     * 
     * @param ex La excepción que fue lanzada.
     * @param request La solicitud web actual.
     * @return Un objeto ResponseEntity que contiene los detalles del error.
     */
    @ExceptionHandler(UsuarioNoEncontradoException.class)
    public ResponseEntity<ErrorDetailsResponse> manejarUsuarioNoEncontradoException(UsuarioNoEncontradoException ex, WebRequest request) {
        ErrorDetailsResponse errorDetails = new ErrorDetailsResponse(
                new Date(),
                ex.getMessage(),
                request.getDescription(false));

        return new ResponseEntity<>(errorDetails, HttpStatus.NOT_FOUND);
    }

    /**
     * ####################################################
     * #       Excepción 404: "Destino no encontrado"     ##
     * ####################################################
     * 
     * @param ex La excepción que fue lanzada.
     * @param request La solicitud web actual.
     * @return Un objeto ResponseEntity que contiene los detalles del error.
     */
    @ExceptionHandler(DestinoNoEncontradoException.class)
    public ResponseEntity<ErrorDetailsResponse> manejarDestinoNoEncontradoException(DestinoNoEncontradoException ex, WebRequest request) {
        ErrorDetailsResponse errorDetails = new ErrorDetailsResponse(
                new Date(),
                ex.getMessage(),
                request.getDescription(false));

        return new ResponseEntity<>(errorDetails, HttpStatus.NOT_FOUND);
    }

    /**
     * ####################################################
     * #       Excepción 404: "Actividad no encontrada"   ##
     * ####################################################
     * 
     * @param ex La excepción que fue lanzada.
     * @param request La solicitud web actual.
     * @return Un objeto ResponseEntity que contiene los detalles del error.
     */
    @ExceptionHandler(ActividadNoEncontradaException.class)
    public ResponseEntity<ErrorDetailsResponse> manejarActividadNoEncontradaException(ActividadNoEncontradaException ex, WebRequest request) {
        ErrorDetailsResponse errorDetails = new ErrorDetailsResponse(
                new Date(),
                ex.getMessage(),
                request.getDescription(false));

        return new ResponseEntity<>(errorDetails, HttpStatus.NOT_FOUND);
    }

  
    
    /**
     * ##########################################################
     * #       Excepción 409: "Destino duplicado"              ##
     * ##########################################################
     * 
     * @param ex La excepción que fue lanzada.
     * @param request La solicitud web actual.
     * @return Un objeto ResponseEntity que contiene los detalles del error.
     */
    @ExceptionHandler(DestinoDuplicadoException.class)
    public ResponseEntity<ErrorDetailsResponse> manejarDestinoDuplicadoException(DestinoDuplicadoException ex, WebRequest request) {
        ErrorDetailsResponse errorDetails = new ErrorDetailsResponse(
                new Date(),
                ex.getMessage(),
                request.getDescription(false));

        return new ResponseEntity<>(errorDetails, HttpStatus.CONFLICT);
    }
    
    /**
     * ##########################################################
     * #       Excepción 409: "Usuario duplicado"              ##
     * ##########################################################
     * 
     * @param ex La excepción que fue lanzada.
     * @param request La solicitud web actual.
     * @return Un objeto ResponseEntity que contiene los detalles del error.
     */
    @ExceptionHandler(UsuarioDuplicadoException.class)
    public ResponseEntity<ErrorDetailsResponse> manejarUsuarioDuplicadoException(UsuarioDuplicadoException ex, WebRequest request) {
        ErrorDetailsResponse errorDetails = new ErrorDetailsResponse(
                new Date(),
                ex.getMessage(),
                request.getDescription(false));

        return new ResponseEntity<>(errorDetails, HttpStatus.CONFLICT);
    }

    
    /**
     * ##########################################################
     * #       Excepción 409: "Actividad duplicada"            ##
     * ##########################################################
     * 
     * @param ex La excepción que fue lanzada.
     * @param request La solicitud web actual.
     * @return Un objeto ResponseEntity que contiene los detalles del error.
     */
    @ExceptionHandler(ActividadDuplicadaException.class)
    public ResponseEntity<ErrorDetailsResponse> manejarActividadDuplicadaException(ActividadDuplicadaException ex, WebRequest request) {
        ErrorDetailsResponse errorDetails = new ErrorDetailsResponse(
                new Date(),
                ex.getMessage(),
                request.getDescription(false));

        return new ResponseEntity<>(errorDetails, HttpStatus.CONFLICT);
    }

    /**
     * ####################################################
     * #       Excepción 400: "Datos de usuario no válidos"       ##
     * ####################################################
     * 
     * @param ex La excepción que fue lanzada.
     * @param request La solicitud web actual.
     * @return Un objeto ResponseEntity que contiene los detalles del error.
     */
    @ExceptionHandler(UsuarioDatosNoValidosException.class)
    public ResponseEntity<ErrorDetailsResponse> manejarUsuarioDatosNoValidosException(UsuarioDatosNoValidosException ex, WebRequest request) {
        ErrorDetailsResponse errorDetails = new ErrorDetailsResponse(
                new Date(),
                ex.getMessage(),
                request.getDescription(false));

        return new ResponseEntity<>(errorDetails, HttpStatus.BAD_REQUEST);
    }

    /**
     * ####################################################
     * #       Excepción 400: "Datos de destino no válidos"       ##
     * ####################################################
     * 
     * @param ex La excepción que fue lanzada.
     * @param request La solicitud web actual.
     * @return Un objeto ResponseEntity que contiene los detalles del error.
     */
    @ExceptionHandler(DestinoDatosNoValidosException.class)
    public ResponseEntity<ErrorDetailsResponse> manejarDestinoDatosNoValidosException(DestinoDatosNoValidosException ex, WebRequest request) {
        ErrorDetailsResponse errorDetails = new ErrorDetailsResponse(
                new Date(),
                ex.getMessage(),
                request.getDescription(false));

        return new ResponseEntity<>(errorDetails, HttpStatus.BAD_REQUEST);
    }

    
    /**
     * ####################################################
     * #       Excepción 400: "Datos de actividad no válidos"     ##
     * ####################################################
     * 
     * @param ex La excepción que fue lanzada.
     * @param request La solicitud web actual.
     * @return Un objeto ResponseEntity que contiene los detalles del error.
     */
    @ExceptionHandler(ActividadDatosNoValidosException.class)
    public ResponseEntity<ErrorDetailsResponse> manejarActividadDatosNoValidosException(ActividadDatosNoValidosException ex, WebRequest request) {
        ErrorDetailsResponse errorDetails = new ErrorDetailsResponse(
                new Date(),
                ex.getMessage(),
                request.getDescription(false));

        return new ResponseEntity<>(errorDetails, HttpStatus.BAD_REQUEST);
    }

    
    
    /**
     * ####################################################
     * #     "Error interno del servidor" Exception 500   ##
     * #####################################################
     * @param ex
     * @param request
     * @return
     */
    @ExceptionHandler(Exception.class)
    public ResponseEntity<ErrorDetailsResponse> handleGlobalException(Exception ex, WebRequest request) {
    	ErrorDetailsResponse errorDetails = new ErrorDetailsResponse(
            new Date(),
            "Error interno del servidor",
            request.getDescription(false));
        return new ResponseEntity<>(errorDetails, HttpStatus.INTERNAL_SERVER_ERROR);
    }
    
    /**
     * ####################################################
     * #     "Acceso denegado" Exception 403             ##
     * #####################################################
     * @param ex
     * @param request
     * @return
     */
    @ExceptionHandler(AccessDeniedException.class)
    public ResponseEntity<ErrorDetailsResponse> handleAccessDeniedException(AccessDeniedException ex, WebRequest request) {
        ErrorDetailsResponse errorDetails = new ErrorDetailsResponse(
            new Date(),
            "Acceso denegado",
            request.getDescription(false));
        return new ResponseEntity<>(errorDetails, HttpStatus.FORBIDDEN);
    }

}