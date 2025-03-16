Gameon application startup scripts

## start the local database 
Run the local RDBM container
```
docker compose -f docker-compose.db.yml up -d --build
```

## start the Service 
Run the local VLE Service container
```
docker compose -f docker-compose.service.yml up -d --build
```

## start the Panel 
Run the local Front End container
```
docker compose -f docker-compose.yml up -d --build
```