package com.planazo.controlador;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.planazo.servicio.Impl.FileStorageService;

@RestController
@RequestMapping("/files")
public class FileController {

	
	 
	 @Autowired
	 private FileStorageService fileStorageService;

	    @PostMapping("/upload")
	    public String uploadFile(@RequestParam("file") MultipartFile file) {
	        return fileStorageService.storeFile(file);
	    }

	    @GetMapping("/{fileName:.+}")
	    public ResponseEntity<Resource> downloadFile(@PathVariable String fileName) {
	        Resource resource = fileStorageService.loadFileAsResource(fileName);
	        return ResponseEntity.ok()
	                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + resource.getFilename() + "\"")
	                .body(resource);
	    }
}