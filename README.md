# Olá
## Tudo bem com você?!
### Estamos aqui!


# projetoM2Digital

## Comandos para rodar a aplicação no localhost
# npm install
# node migrations/m2_equipes.js
# node migrations/m2_usuarios.js
# node seeds/m2_equipes_seed.js
# node seeds/m2_usuarios_seed.js

## Comandos para rodar a aplicação via Docker

#docker login -u seu-username-docker
#docker push seu-username-docker/projetom2backend
#docker build -t seu-username-docker/projetom2backend . 
#docker run -it -p 3000:3000 -h instance-hostname --rm --name projetom2backend seu-username-docker/projetom2backend:latest
