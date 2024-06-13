package com.planazo.servicio;

import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;



@Service
public interface JwtServicio {
	String extractUserName(String token);
    String generateToken(UserDetails userDetails);
    boolean isTokenValid(String token, UserDetails userDetails);

}
