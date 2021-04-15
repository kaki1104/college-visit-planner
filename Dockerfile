# Fill out this Dockerfile!
# TODO: Choose and pull "FROM" a base image (maven:latest).
FROM maven:latest

# TODO: "COPY" all files from the current directory over to Docker.
WORKDIR /usr/src/app
COPY . .

# TODO: "RUN" any commands you need to set up the project.
RUN mvn clean package -Dmaven.test.skip=true

# TODO: Choose a "CMD" to run on startup.
CMD [ "/usr/src/app/run", "--gui"]