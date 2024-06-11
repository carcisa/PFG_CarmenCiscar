package com.planazo.configuracion;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {

	//Cors para Angular
    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**") // Esto aplica a todas las rutas
                .allowedOrigins("http://localhost:4200") // Orígenes permitidos
                .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS") // Métodos permitidos
                .allowedHeaders("*") // Cabeceras permitidas
                .allowCredentials(true); // Permitir credenciales
    }
    
 // Configuración para servir archivos estáticos
    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        registry.addResourceHandler("/files/**")
                .addResourceLocations("file:C:/Users/carme/OneDrive/Escritorio/PROYECTO/PFG_CarmenCiscar/docs/assets/actividades/");
    }
}