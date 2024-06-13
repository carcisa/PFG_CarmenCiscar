package com.planazo.configuracion;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.core.io.ClassPathResource;
import org.springframework.core.io.Resource;
import org.springframework.jdbc.datasource.init.ResourceDatabasePopulator;
import org.springframework.jdbc.datasource.init.ScriptException;
import org.springframework.stereotype.Component;
import javax.sql.DataSource;

@Component
public class DatabaseInitializer implements CommandLineRunner {

    @Autowired
    private DataSource dataSource;

    @Override
    public void run(String... args) throws Exception {
        Resource resource = new ClassPathResource("scripts/01_init_data.sql");
        ResourceDatabasePopulator databasePopulator = new ResourceDatabasePopulator(resource);
        try {
            databasePopulator.execute(dataSource);
        } catch (ScriptException e) {
            e.printStackTrace();
        }
    }
}
