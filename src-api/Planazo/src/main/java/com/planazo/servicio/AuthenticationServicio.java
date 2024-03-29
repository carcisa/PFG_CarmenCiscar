package com.planazo.servicio;

import com.planazo.DTO.JwtAuthenticationResponse;
import com.planazo.request.SignUpRequest;
import com.planazo.request.SigninRequest;

public interface AuthenticationServicio {
	
	/** REGISTRO */
    JwtAuthenticationResponse signup(SignUpRequest request);
    /** ACCESO a Token JWT */
    JwtAuthenticationResponse signin(SigninRequest request);
}
