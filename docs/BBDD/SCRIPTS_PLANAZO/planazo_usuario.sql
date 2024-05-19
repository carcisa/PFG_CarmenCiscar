-- MySQL dump 10.13  Distrib 8.0.18, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: planazo
-- ------------------------------------------------------
-- Server version	8.0.18

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Dumping data for table `usuario`
--

LOCK TABLES `usuario` WRITE;
/*!40000 ALTER TABLE `usuario` DISABLE KEYS */;
INSERT INTO `usuario` VALUES (1,'admin@example.com','admin','$2a$10$Y.I6LLng.sB6j/PnV6CTweYq2puO2kQ/mpHFZhUVvCsJ0OO8wNTri'),(2,'user@example.com','user','$2a$10$9rLyZgVPD2BeKthQloOqNej8ryyDmBVvgGPpehoyuoYhrt9IPjKYa'),(3,'mariajimenez@gmail.com','María Jiménez','maria1234'),(4,'juanperez@gmail.com','Juan Pérez','juan1234'),(5,'analopez@gmail.com','Ana López','ana1234'),(6,'robertogarcia@gmail.com','Roberto García','roberto1234'),(7,'lauramartinez@gmail.com','Laura Martínez','laura1234'),(8,'carloshernandez@gmail.com','Carlos Hernández','carlos1234'),(9,'patriciagonzalez@gmail.com','Patricia González','patricia1234'),(10,'fernandoalvarez@gmail.com','Fernando Álvarez','fernando1234'),(11,'carmenruiz@gmail.com','Carmen Ruiz','carmen1234'),(12,'sergiomoreno@gmail.com','Sergio Moreno','sergio1234');
/*!40000 ALTER TABLE `usuario` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-05-19 17:12:58
