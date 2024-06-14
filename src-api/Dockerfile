FROM openjdk:17-jdk-alpine as builder

WORKDIR /app

COPY ./.mvn /app/.mvn
COPY ./mvnw /app/mvnw
COPY ./pom.xml /app/pom.xml

WORKDIR /app
RUN chmod +x mvnw
# Run the Maven build, skipping tests, main compilation, and Spring Boot repackage
RUN ./mvnw clean package -Dmaven.test.skip -Dmaven.main.skip -Dspring-boot.repackage.skip && rm -r ./target/

# Copy the source files to the microservice directory
COPY ./src /app/src

RUN ./mvnw clean package -DskipTests

FROM openjdk:17-jdk-alpine


WORKDIR /app

RUN mkdir ./logs

ARG TARGET_FOLDER=/app/target
COPY --from=builder $TARGET_FOLDER/Planazo-0.0.1-SNAPSHOT.jar .
ARG PORT_APP=8001
ENV PORT $PORT_APP
EXPOSE $PORT

CMD ["java", "-jar", "Planazo-0.0.1-SNAPSHOT.jar"]