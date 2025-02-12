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
    - debe obtener los ultimos logs de cada tipo y combinacion de property/service/tarea
- crear script que consuma la vista 
    - analizar los registros con las siguientes condiciones: si el task=register_diary filtrar por status = FAIL, de lo contrario, por status=(FAIL, WARN)
    - enviar alerta via api haciendo un post al webhook de Google Chat GOOGLE_CHAT_WEBHOOK_URL
    
