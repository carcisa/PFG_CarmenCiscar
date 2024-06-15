package com.planazo.entidad;

public enum Rol{
	ROL_USER,
    ROL_ADMIN;
   
    public static Rol fromString(String role) {
        try {
            return Rol.valueOf(role);
        } catch (IllegalArgumentException e) {
            throw new IllegalArgumentException("No enum constant for string: " + role);
        }
    }
}
