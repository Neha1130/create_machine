### Install packages command

npm install

### Application start command

npm start

### create docker image

docker build . -t machine_client:v1

### docker image hosting

docker run -p 3000:80 -d machine_client:v1

### See all running containers for dockers

docker ps

### Stop the previous container Copy "Name" or "Container ID" of your container and pass it into docker stop

docker stop <container name|id>
