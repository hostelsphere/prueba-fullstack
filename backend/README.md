# 🚀 Proyecto de Prueba Técnica

Bienvenido/a al desafío técnico. En este proyecto trabajarás con **Bun**, **Prisma**, y **PostgreSQL** en un entorno Docker. A continuación, encontrarás las instrucciones para configurar el entorno de desarrollo y comenzar con la implementación.

---

## 📋 Requisitos Previos

Antes de comenzar, asegúrate de tener instalados los siguientes programas:

1. **[Bun](https://bun.sh/)**

   Instala Bun ejecutando:
   ```bash
   curl -fsSL https://bun.sh/install | bash
   ```

2. **[Docker & Docker Compose](https://www.docker.com/)**

   Docker permite ejecutar la base de datos en un contenedor de manera sencilla.
   Verifica la instalación:
   ```bash
   docker --version
   docker-compose --version
   ```

3. **Cliente de base de datos (recomendado)**

   Para visualizar los datos de la base de datos de forma sencilla, se sugiere instalar una herramienta como [DBeaver](https://dbeaver.io/), [TablePlus](https://tableplus.com/) o [pgAdmin](https://www.pgadmin.org/).

---

## ⚙️ Configuración del Proyecto

1. **Instala las dependencias:**
   ```bash
   bun install
   ```

2. **Configura las variables de entorno:**
   - Copia el archivo `.env.example` y renómbralo como `.env`:
     ```bash
     cp .env.example .env
     ```
   - Completa los valores en el archivo `.env`:
     ```env
     POSTGRES_USER=tu_usuario #completar
     POSTGRES_PASSWORD=tu_contraseña #completar
     POSTGRES_DB=test
     POSTGRES_HOST=localhost
     POSTGRES_PORT=5432
     DATABASE_URL=postgresql://${POSTGRES_USER}:${POSTGRES_PASSWORD}@${POSTGRES_HOST}:${POSTGRES_PORT}/${POSTGRES_DB}

     # Webhook de Google Chat para enviar alertas
     GOOGLE_CHAT_WEBHOOK_URL=https://chat.googleapis.com/v1/spaces/.../messages?key=...&token=...
     ```

3. **Levanta la base de datos con Docker Compose:**
   ```bash
   docker-compose up -d
   ```

---

## 🗃️ Migraciones, Generación de Cliente y Seeds

Este proyecto utiliza **[Prisma](https://www.prisma.io/)** con múltiples schemas en PostgreSQL ("general" y "monitoring") dentro de la base de datos **test**.

1. **Aplica las migraciones a la base de datos:**
   ```bash
   bun run prisma:deploy
   ```

2. **Genera el cliente de Prisma:**
   ```bash
   bun run prisma:generate
   ```

3. **Ejecuta los seeds (opcional):**
   ```bash
   bun run seed
   ```
   Este comando poblará la base de datos con datos iniciales o de ejemplo.

---

## 🔍 Opciones para Acceder a la Base de Datos

Puedes interactuar con PostgreSQL utilizando dos enfoques:

### ✅ 1. Prisma Client (Recomendado)

Ejemplo de uso (en tu `index.ts` con una función principal `main()`):

```typescript
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Lógica principal del proyecto.
  // Este método se recomienda como tu punto de entrada.
  const logs = await prisma.monitoringLog.findMany();
  console.log(logs);
}

main()
  .catch((e) => console.error(e))
  .finally(async () => {
    await prisma.$disconnect();
  });
```

### ⚡ 2. Librería `pg` (Driver Nativo de PostgreSQL)

Ejemplo de uso:

```typescript
import { Client } from 'pg';

async function main() {
  const client = new Client({
    connectionString: process.env.DATABASE_URL,
  });

  await client.connect();
  const res = await client.query('SELECT * FROM monitoring.logs;');
  console.log(res.rows);
  await client.end();
}

main();
```

Si decides usar `pg`, instálala:
```bash
bun add pg
```

También puedes instalar cualquier **dependencia externa** que consideres necesaria para tu solución.

---

## 🚀 Ejecutar el Proyecto

Una vez configurado, ejecuta el proyecto con:
```bash
bun run start
```

## 📝 Desafío Técnico

### Funcionalidad a Implementar

En este proyecto, **orientado a objetos**, deberás demostrar habilidades en **principios SOLID** y, buenas practicas de desarrollo.

El flujo general es el siguiente:

1. **Crear una vista llamada `view_realtime_logs`** en el schema `monitoring`.
   - Esta vista debe mostrar los últimos logs de cada combinación única de `property/service/task`. Sirve para monitorear el estado actual de cada tarea.

2. **Diseñar un conjunto de clases** que:
   - Consulten la vista `view_realtime_logs`.
   - Apliquen diferentes reglas según la tarea:
     - Si `task = 'register_diary'`, filtra los logs con `status = 'FAIL'`.
     - Para cualquier otro valor de `task`, filtra los logs con `status` en `(FAIL, WARN)`.

3. **Enviar alertas** vía API haciendo un `POST` al webhook de Google Chat (utilizando `GOOGLE_CHAT_WEBHOOK_URL`, busca un ejemplo sencillo en internet o utiliza la documentacion: https://developers.google.com/workspace/chat/messages-overview?hl=es-419).
   - La alerta debe incluir información relevante de cada registro. **Es obligatorio** que el nombre de la propiedad se muestre en el mensaje.

4. **Pruebas unitarias con Jest**:
   - Debes crear una prueba que valide el correcto funcionamiento del envio de alertas. Se recomienda el uso de mocks.
   - El proyecto está configurado con **Jest** para facilitar este proceso; utiliza el archivo `index.test.ts` o crea tus propios archivos de prueba.
   - Para ejecutar las pruebas, corre:
     ```bash
     bun run test
     ```

5. **Buena práctica**: Implementa tu solución cuidando los principios SOLID y con un manejo de errores claro, manteniendo las clases bien definidas en cuanto a responsabilidades.

---

## ❓ Notas Finales

- No compartas tu archivo `.env` en repositorios públicos.
- Se valorará el uso de buenas prácticas de desarrollo, la claridad en los commits y la estructuración del código siguiendo **SOLID**.
- Documenta cualquier decisión técnica relevante en este README si lo consideras necesario.

¡Buena suerte! 🚀

