## Frontend

### Objetivo: 
- Copiar diseño exacto de la encuesta del archivo (frontend_diseño.png).

### Requisitos:
- react
- tailwind
- typescript

### Consideraciones:
mockear los datos de resultados

### Entregable:
subir a un repositorio publico y compartir el link

## Backend

### Procedimiento:
- crear una tabla en postgres llamada logs
- insertar los datos de prueba en sql (mock_logs.sql)
- crear vista llamada view_realtime_logs
    - debe contemplar los ultimos logs de cada tipo y combinacion de propiedad/servicio/tarea, para poder revisarlos
- crear script que consuma la vista 
    - filtrar por los registros si el task=register_diary por status = FAIL, sino por status=(FAIL, WARN)
    - enviar alerta via api
        POST https://endpoint.com 
    
