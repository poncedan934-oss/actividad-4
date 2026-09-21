#API de Gestión de Turnos y Médicos

API REST desarrollada con **Node.js, TypeScript y Express** para gestionar turnos médicos y médicos.

El proyecto implementa una arquitectura por capas, validación de datos mediante **Zod**, persistencia de información mediante archivos JSON y autenticación mediante **JWT (JSON Web Token)**.

---

##tecnologías utilizadas

- Node.js
- TypeScript
- Express
- Zod
- JSON Web Token (JWT)
- dotenv
- tsx
- Postman

---

#1. requisitos

Antes de instalar el proyecto es necesario tener instalado:

| Herramienta | Versión recomendada |
|---|---|
| Node.js | 20.x o superior |
| npm | 10.x o superior |
| Git | Opcional |
| Postman | Recomendado para probar la API |

Se puede comprobar la instalación ejecutando:

```bash
node --versión


#2. instalación y ejecución en desarrollo

## 2.1 Clonar el proyecto

```bash
git clone <URL_DEL_REPOSITORIO>
cd turnos-red
```

## 2.2 Verificar Node.js y npm

```bash
node --version
npm --version
```

Se recomienda Node.js 20.x o superior y npm 10.x o superior.

## 2.3 Instalar las dependencias

Desde la raíz del proyecto:

```bash
npm install
```

Este comando instala las dependencias declaradas en `package.json`.

## 2.4 Configurar las variables de entorno

Crear `.env` en la raíz del proyecto, al mismo nivel que `package.json`:

```env
PORT=3000
JWT_SECRET=clave_segura
JWT_EXPIRES_IN=1h
```

## 2.5 Ejecutar en desarrollo

```bash
npm run dev
```

El servidor debería mostrar:

```text
Servidor HTTP ejecutándose en http://localhost:3000
```

La URL base es:

```text
http://localhost:3000
```

## 2.6 Probar la API

Para los endpoints protegidos, primero realizar:

```http
POST http://localhost:3000/api/auth/login
```

con:

```json
{
  "usuario": "admin",
  "password": "1234"
}
```

Luego enviar el token obtenido mediante:

```http
Authorization: Bearer <TOKEN>
```

#3. variables de entorno

crear un archivo .env en la raíz del proyecto, en el mismo nivel que packages.json
ejemplo:

PORT=3000
JWT_SECRET=clave_segura
JWT_EXPIRES_IN=1h

Tabla de variables
Variable      Descripción	                        Ejemplo	Obligatoria
PORT	     Puerto donde se ejecutará el servidor	3000	No
JWT_SECRET   Clave utilizada para firmar los tokens JWT	mi_clave_secreta_super_segura	Sí
JWT_EXPIRES_IN	Tiempo de expiración del token	1h	No

el archivo gitignore debe contener:
.env
/node_modules
/dist

Para facilitar la configuración del proyecto se recomienda incluir un archivo .env.example:
PORT=3000
JWT_SECRET=
JWT_EXPIRES_IN=1h

#4.ejecución

Ejecutar:

npm run dev

El servidor debería mostrar:

Servidor HTTP ejecutándose en http://localhost:3000

La URL base de la API será:

http://localhost:3000

#5.esturctura de directorios
turnos-red/
│
├── src/
│   │
│   ├── errors/
│   │   └── app.error.ts
│   │
│   │
│   ├── controllers/
│   │   ├── auth.controller.ts
│   │   ├── medicos.controller.ts
│   │   ├── hello.controller.ts
│   │   └── turnos.controller.ts
│   │
│   │
│   ├── middleware/
│   │   ├── auth.middleware.ts
│   │   ├── not-found.middleware.ts
│   │   └── error.middleware.ts
│   │
│   ├── repositories/
│   │   ├── medicos.repository.ts
│   │   └── turnos.repository.ts
│   │
│   ├── routes/
│   │   ├── auth.routes.ts
│   │   ├── medicos.routes.ts
│   │   ├── hello.routes.ts
│   │   └── turnos.routes.ts
│   │
│   ├── schemas/
│   │   ├── login.schema.ts
│   │   ├── medico.schema.ts
│   │   └── turno.schema.ts
│   │
│   ├── services/
│   │   ├── auth.service.ts
│   │   ├── medicos.service.ts
│   │   └── turnos.service.ts
│   │
│   ├── models/
│   │   ├── medico.ts
│   │   └── turno.ts
│   │
│   └── server.ts
│
├── medicos.json
├── turnos.json
│
├── turnos.listener.ts
├── cliente.html
├── middleware.json
├── eventBus.ts
├── .env
├── .env.example
├── .gitignore
├── package.json
├── package-lock.json
├── tsconfig.json
└── README.md

#6.arquitectura
Cliente / Postman
        │
        ▼
     Routes
        │
        ▼
   Controllers
        │
        ▼
     Services
        │
        ▼
   Repositories
        │
        ▼
     JSON Files
Routes

Define las rutas disponibles de la API y determina qué controlador debe procesar cada solicitud.

Controllers

Recibe las solicitudes HTTP, valida los datos de entrada y devuelve las respuestas HTTP.

Services

Contiene la lógica de negocio de la aplicación.

Repositories

Se encarga del acceso y modificación de los archivos JSON.

Schemas

Contiene los esquemas de validación utilizando Zod.

Middleware

Contiene funcionalidades que se ejecutan antes de llegar al controlador.

#7.recursos disponibles
La API dispone de los siguientes recursos:

/api/auth
/api/medicos
/api/turnos

#8. Autenticación

La API utiliza JWT para proteger los endpoints de médicos y turnos.

El login se realiza mediante:

POST /api/auth/login
Credenciales de prueba
{
  "usuario": "admin",
  "password": "1234"
}
Respuesta exitosa
{
  "mensaje": "Login exitoso",
  "token": "eyJhbGciOiJIUzI1NiIs..."
}

El token debe enviarse posteriormente en las solicitudes protegidas mediante:

Authorization: Bearer <TOKEN>

En Postman se puede configurar desde:

Authorization
→ Type: Bearer Token
→ Token: {{token}}

#9.endpoints de autenticación
POST /api/auth/login

Realiza el inicio de sesión y genera un token JWT.

Request
POST http://localhost:3000/api/auth/login

Body:

{
  "usuario": "admin",
  "password": "1234"
}
Respuesta 200
{
  "mensaje": "Login exitoso",
  "token": "eyJhbGciOiJIUzI1NiIs..."
}
Credenciales incorrectas

Respuesta:

401 Unauthorized
{
  "error": "Usuario o contraseña incorrectos"
}
Datos inválidos

Respuesta:

400 Bad Request



#10.endpoints de Médicos

Todas las rutas de médicos requieren autenticación JWT.

GET /api/medicos

Obtiene todos los médicos.

GET http://localhost:3000/api/medicos

Header:

Authorization: Bearer <TOKEN>
Respuesta
[
  {
    "id": 1,
    "nombre": "Juan",
    "apellido": "Pérez",
    "especialidad": "Cardiología",
    "matricula": "MP12345"
  }
]
GET /api/medicos/:id

Obtiene un médico mediante su ID.

GET http://localhost:3000/api/medicos/1
Médico inexistente

Respuesta:

404 Not Found
POST /api/medicos

Crea un nuevo médico.

POST http://localhost:3000/api/medicos

Body de ejemplo:

{
  "nombre": "Carlos",
  "apellido": "Gómez",
  "especialidad": "Neurología",
  "matricula": "MP67890"
}
Respuesta
201 Created
PUT /api/medicos/:id

Actualiza un médico existente.

PUT http://localhost:3000/api/medicos/1

Body:

{
  "nombre": "Carlos",
  "apellido": "Gómez",
  "especialidad": "Neurología",
  "matricula": "MP67890"
}
Médico inexistente
404 Not Found
DELETE /api/medicos/:id

Elimina un médico.

DELETE http://localhost:3000/api/medicos/1
Respuesta exitosa
204 No Content

#12.endpoints de Turnos

Todas las rutas de turnos requieren autenticación JWT.

GET /api/turnos

Obtiene todos los turnos.

GET http://localhost:3000/api/turnos
Respuesta
[
  {
    "id": 1,
    "fecha": "2026-09-01",
    "hora": "10:00",
    "paciente": "Juan Pérez",
    "documento": 12345678,
    "especialidad": "Cardiología",
    "confirmado": true
  },
  {
    "id": 2,
    "fecha": "2026-09-01",
    "hora": "11:30",
    "paciente": "María Gómez",
    "documento": 28765432,
    "especialidad": "Dermatología",
    "confirmado": false
  }
]
GET /api/turnos/:id

Obtiene un turno mediante su ID.

GET http://localhost:3000/api/turnos/1
Respuesta
{
  "id": 1,
  "fecha": "2026-09-01",
  "hora": "10:00",
  "paciente": "Juan Pérez",
  "documento": 12345678,
  "especialidad": "Cardiología",
  "confirmado": true
}
POST /api/turnos

Crea un nuevo turno.

POST http://localhost:3000/api/turnos

Body:

{
  "fecha": "2026-09-02",
  "hora": "14:00",
  "paciente": "Pedro Rodríguez",
  "documento": 30111222,
  "especialidad": "Clínica Médica",
  "confirmado": false
}
Respuesta
201 Created
PUT /api/turnos/:id

Actualiza un turno existente.

PUT http://localhost:3000/api/turnos/1

Body:

{
  "fecha": "2026-09-03",
  "hora": "15:30",
  "paciente": "Juan Pérez",
  "documento": 12345678,
  "especialidad": "Cardiología",
  "confirmado": true
}
DELETE /api/turnos/:id

Elimina un turno.

DELETE http://localhost:3000/api/turnos/1
Respuesta
204 No Content

#13.query Params de Turnos

El endpoint:

GET /api/turnos

permite filtrar los turnos mediante parámetros de consulta.

Filtrar por fecha
GET /api/turnos?fecha=2026-09-01

Devuelve los turnos correspondientes a esa fecha.

Filtrar por hora
GET /api/turnos?hora=10:00
Filtrar por paciente
GET /api/turnos?paciente=Juan

También permite buscar parte del nombre:

GET /api/turnos?paciente=Mar
Filtrar por documento
GET /api/turnos?documento=12345678
Filtrar por especialidad
GET /api/turnos?especialidad=Cardiología

También se puede realizar una búsqueda parcial:

GET /api/turnos?especialidad=Cardio
Filtrar por estado de confirmación

Para obtener solamente los turnos confirmados:

GET /api/turnos?confirmado=true

Para obtener los turnos no confirmados:

GET /api/turnos?confirmado=false
Combinar varios filtros

Los parámetros pueden combinarse.

Por ejemplo:

GET /api/turnos?fecha=2026-09-01&especialidad=Cardiología

También:

GET /api/turnos?fecha=2026-09-01&confirmado=true

O:

GET /api/turnos?paciente=Juan&especialidad=Cardiología

#14. documentación REST de los recursos

Esta sección documenta cada endpoint indicando método HTTP, path del recurso, descripción funcional, parámetros de entrada y respuestas exitosas y de error.

## 14.1 Autenticación

### POST /api/auth/login

**Descripción funcional:** autentica al usuario y genera un token JWT.

**Params:** ninguno.

**Query Params:** ninguno.

**Body JSON:**

```json
{
  "usuario": "admin",
  "password": "1234"
}
```

**200 OK:**

```json
{
  "mensaje": "Login exitoso",
  "token": "eyJhbGciOiJIUzI1NiIs..."
}
```

**Errores:** `400 Bad Request`, `401 Unauthorized` y `500 Internal Server Error`.

---

## 14.2 Médicos

### GET /api/medicos

**Descripción funcional:** obtiene todos los médicos.

**Params:** ninguno.

**Query Params:** no se documentan filtros específicos para este endpoint en el README actual.

**Body JSON:** ninguno.

**200 OK:**

```json
[
  {
    "id": 1,
    "nombre": "Juan",
    "apellido": "Pérez",
    "especialidad": "Cardiología",
    "matricula": "MP12345"
  }
]
```

**Errores:** `401 Unauthorized`, `500 Internal Server Error`.

### GET /api/medicos/:id

**Descripción funcional:** obtiene un médico mediante su ID.

**Params:**

| Parámetro | Tipo | Obligatorio |
|---|---|---|
| `id` | integer | Sí |

**Query Params:** ninguno.

**Body JSON:** ninguno.

**200 OK:** devuelve el médico solicitado.

**Errores:** `401 Unauthorized`, `404 Not Found`, `500 Internal Server Error`.

### POST /api/medicos

**Descripción funcional:** crea un nuevo médico.

**Params:** ninguno.

**Query Params:** ninguno.

**Body JSON:**

```json
{
  "nombre": "Carlos",
  "apellido": "Gómez",
  "especialidad": "Neurología",
  "matricula": "MP67890"
}
```

**201 Created:** devuelve el recurso creado.

**Errores:** `400 Bad Request`, `401 Unauthorized`, `500 Internal Server Error`.

### PUT /api/medicos/:id

**Descripción funcional:** actualiza un médico existente.

**Params:**

| Parámetro | Tipo | Obligatorio |
|---|---|---|
| `id` | integer | Sí |

**Query Params:** ninguno.

**Body JSON:**

```json
{
  "nombre": "Carlos",
  "apellido": "Gómez",
  "especialidad": "Neurología",
  "matricula": "MP67890"
}
```

**200 OK:** devuelve el médico actualizado.

**Errores:** `400 Bad Request`, `401 Unauthorized`, `404 Not Found`, `500 Internal Server Error`.

### DELETE /api/medicos/:id

**Descripción funcional:** elimina un médico existente.

**Params:**

| Parámetro | Tipo | Obligatorio |
|---|---|---|
| `id` | integer | Sí |

**Query Params:** ninguno.

**Body JSON:** ninguno.

**204 No Content:** eliminación realizada correctamente, según la documentación actual.

**Errores:** `401 Unauthorized`, `404 Not Found`, `500 Internal Server Error`.

---

## 14.3 Turnos

### GET /api/turnos

**Descripción funcional:** obtiene los turnos y permite filtrarlos mediante query params.

**Params:** ninguno.

**Query Params:**

| Parámetro | Tipo | Descripción |
|---|---|---|
| `fecha` | string | Filtra por fecha |
| `hora` | string | Filtra por hora |
| `paciente` | string | Busca por paciente, incluso parcialmente |
| `documento` | number | Filtra por documento |
| `especialidad` | string | Busca por especialidad, incluso parcialmente |
| `confirmado` | boolean | Filtra por estado de confirmación |

**Ejemplos:**

```http
GET /api/turnos
GET /api/turnos?fecha=2026-09-01
GET /api/turnos?paciente=Juan
GET /api/turnos?especialidad=Cardio
GET /api/turnos?confirmado=true
GET /api/turnos?fecha=2026-09-01&especialidad=Cardiología
```

**Body JSON:** ninguno.

**200 OK:**

```json
[
  {
    "id": 1,
    "fecha": "2026-09-01",
    "hora": "10:00",
    "paciente": "Juan Pérez",
    "documento": 12345678,
    "especialidad": "Cardiología",
    "confirmado": true
  }
]
```

**Errores:** `400 Bad Request`, `401 Unauthorized`, `500 Internal Server Error`.

### GET /api/turnos/:id

**Descripción funcional:** obtiene un turno específico mediante su ID.

**Params:**

| Parámetro | Tipo | Obligatorio | Descripción |
|---|---|---|---|
| `id` | integer positivo | Sí | Identificador del turno |

**Query Params:** ninguno.

**Body JSON:** ninguno.

**200 OK:**

```json
{
  "estado": "EXITOSO",
  "data": {
    "id": 1,
    "fecha": "2026-09-01",
    "hora": "10:00",
    "paciente": "Juan Pérez",
    "documento": 12345678,
    "especialidad": "Cardiología",
    "confirmado": true
  }
}
```

**400 Bad Request:**

```json
{
  "error": "El ID debe ser un entero positivo"
}
```

**404 Not Found:**

```json
{
  "error": "Turno no encontrado"
}
```

También puede devolver `401 Unauthorized` o `500 Internal Server Error`.

### POST /api/turnos

**Descripción funcional:** crea un nuevo turno médico.

**Params:** ninguno.

**Query Params:** ninguno.

**Body JSON:**

```json
{
  "fecha": "2026-09-02",
  "hora": "14:00",
  "paciente": "Pedro Rodríguez",
  "documento": 30111222,
  "especialidad": "Clínica Médica",
  "confirmado": false
}
```

**201 Created:**

```json
{
  "estado": "EXITOSO",
  "data": {
    "id": 2,
    "fecha": "2026-09-02",
    "hora": "14:00",
    "paciente": "Pedro Rodríguez",
    "documento": 30111222,
    "especialidad": "Clínica Médica",
    "confirmado": false
  }
}
```

**Errores:** `400 Bad Request`, `401 Unauthorized`, `500 Internal Server Error`.

### PUT /api/turnos/:id

**Descripción funcional:** actualiza un turno existente.

**Params:**

| Parámetro | Tipo | Obligatorio |
|---|---|---|
| `id` | integer positivo | Sí |

**Query Params:** ninguno.

**Body JSON:**

```json
{
  "fecha": "2026-09-03",
  "hora": "15:30",
  "paciente": "Juan Pérez",
  "documento": 12345678,
  "especialidad": "Cardiología",
  "confirmado": true
}
```

**200 OK:** devuelve el turno actualizado.

**Errores:** `400 Bad Request`, `401 Unauthorized`, `404 Not Found`, `500 Internal Server Error`.

### DELETE /api/turnos/:id

**Descripción funcional:** elimina un turno existente.

**Params:**

| Parámetro | Tipo | Obligatorio |
|---|---|---|
| `id` | integer positivo | Sí |

**Query Params:** ninguno.

**Body JSON:** ninguno.

**204 No Content:** la documentación actual contempla este código para una eliminación exitosa. Si la implementación real devuelve `200`, debe ajustarse la documentación al comportamiento del código.

**Errores:** `400 Bad Request`, `401 Unauthorized`, `404 Not Found`, `500 Internal Server Error`.

---

## 14.4 Resumen de endpoints REST

| Método HTTP | Path | Operación |
|---|---|---|
| `POST` | `/api/auth/login` | Autenticar usuario |
| `GET` | `/api/medicos` | Listar médicos |
| `GET` | `/api/medicos/:id` | Obtener médico |
| `POST` | `/api/medicos` | Crear médico |
| `PUT` | `/api/medicos/:id` | Actualizar médico |
| `DELETE` | `/api/medicos/:id` | Eliminar médico |
| `GET` | `/api/turnos` | Listar / filtrar turnos |
| `GET` | `/api/turnos/:id` | Obtener turno |
| `POST` | `/api/turnos` | Crear turno |
| `PUT` | `/api/turnos/:id` | Actualizar turno |
| `DELETE` | `/api/turnos/:id` | Eliminar turno |

#14.códigos de respuesta HTTP

La API utiliza códigos HTTP estándar:

Código	                        Significado
200 OK	                        Solicitud procesada correctamente
201 Created	                Recurso creado correctamente
204 No Content	                Recurso eliminado correctamente
400 Bad Request	                Datos enviados incorrectamente
401 Unauthorized	        Falta el token o es inválido
404 Not Found	                Recurso no encontrado
500 Internal Server Error	Error interno del servidor

#15.ejemplo de flujo completo con Postman

Para utilizar los endpoints protegidos se recomienda seguir este orden:

1. Iniciar el servidor
        ↓
2. POST /api/auth/login
        ↓
3. Obtener el JWT
        ↓
4. Guardar el token en Postman
        ↓
5. Enviar Authorization: Bearer {{token}}
        ↓
6. Ejecutar GET /api/medicos
        ↓
7. Ejecutar POST /api/medicos
        ↓
8. Ejecutar GET /api/turnos
        ↓
9. Ejecutar POST /api/turnos
        ↓
10. Actualizar o eliminar recursos

#16.ejemplo de configuración de Postman

Se recomienda crear un Environment llamado:

Turnos API - Local

Variables:

Variable	Valor
baseUrl	        http://localhost:3000
token	        Token JWT obtenido mediante login
medicoId	ID de médico
turnoId	        ID de turno

Las solicitudes pueden utilizar:

{{baseUrl}}/api/auth/login
{{baseUrl}}/api/medicos
{{baseUrl}}/api/medicos/{{medicoId}}
{{baseUrl}}/api/turnos
{{baseUrl}}/api/turnos/{{turnoId}}

#17.validación de datos

Los datos recibidos por la API son validados mediante Zod.

Por ejemplo, antes de crear un turno se valida que los campos enviados cumplan con el esquema definido.

Si los datos no cumplen las reglas de validación, la API responde:

400 Bad Request

Ejemplo:

{
  "error": "Datos inválidos",
  "detalles": []
}

#18.persistencia

Actualmente la información se almacena en archivos JSON:

medicos.json
turnos.json

Los repositories son responsables de:

Leer los archivos.
Buscar registros.
Crear registros.
Actualizar registros.
Eliminar registros.
Guardar los cambios nuevamente en los archivos.

Esta implementación permite trabajar con una persistencia sencilla sin utilizar una base de datos

#19.seguridad

El proyecto utiliza JWT para proteger los recursos de la API.

Los endpoints:

/api/medicos/*
/api/turnos/*

requieren un token válido.

El endpoint:

/api/auth/login

permite obtener dicho token.

La clave utilizada para firmar los tokens se almacena en:

JWT_SECRET

y no debe incluirse directamente en el código fuente.

#20.scripts disponibles

Los scripts principales del proyecto son:

npm run dev

Inicia el servidor en modo desarrollo.

npm run build

Compila el proyecto TypeScript.

npm start

Ejecuta la aplicación compilada.

npm run lint

Ejecuta ESLint para detectar problemas en el código.


#21.ejemplo rápido

Una vez iniciado el servidor:

1. Login
POST http://localhost:3000/api/auth/login
{
  "usuario": "admin",
  "password": "1234"
}
2. Obtener token

Guardar el valor:

{
  "token": "eyJ..."
}
3. Consultar turnos
GET http://localhost:3000/api/turnos

Header:

Authorization: Bearer eyJ...
4. Filtrar turnos
GET http://localhost:3000/api/turnos?especialidad=Cardiología
5. Buscar un turno
GET http://localhost:3000/api/turnos/1


#22.estado del proyecto

Actualmente la API cuenta con:

 API REST con Express
 TypeScript
 Arquitectura por capas
 CRUD de médicos
 CRUD de turnos
 Persistencia mediante JSON
 Validación con Zod
 Query params para filtros
 Autenticación JWT
 Middleware de autenticación
 Variables de entorno
 Pruebas mediante Postman
 Manejo de códigos HTTP
 ESLint / Prettier




|tarea  |herramienta|prompt utilizado    |Ajuste manual aplicado
|_______|___________|____________________|_______________________
|revisar|gemini     |podrias revisar     | no se tuvo ningun que
|errores|           |el siguente         | hacer ningun ajuste
|en el  |           |codigo en busca     |
|codigo |           |de errores. pegue   |
|       |           |el codigo de        |
|       |           |turnos.services.ts  |

codigo original de turnos.services.ts
import { Turnos } from "./models/turnos";

import { TurnoInput } from "../../../schemas/turno.schema";

import { TurnoQuery } from "../../../schemas/turno.query.schema";

import { TurnosRepository } from "../../../repositories/turnos.repository";


export class TurnosService {

    constructor(
        private repository: TurnosRepository
    ) {}

    async obtenerPorId(
        id: number
    ): Promise<Turnos | undefined> {

        return await this.repository.obtenerPorId(id);
    }

    async obtenerTodos(
    filtros: TurnoQuery = {}
): Promise<Turnos[]> {

    const turnos =
        await this.repository.obtenerTodos();

    console.log("TURNOS ANTES DEL FILTRO:", turnos);
    console.log("FILTROS APLICADOS:", filtros);

    return turnos.filter((turno) => {

        if (
            filtros.fecha &&
            turno.fecha !== filtros.fecha
        ) {
            return false;
        }

        if (
            filtros.hora &&
            turno.hora !== filtros.hora
        ) {
            return false;
        }

        if (
            filtros.paciente &&
            !turno.paciente
                .toLowerCase()
                .includes(
                    filtros.paciente.toLowerCase()
                )
        ) {
            return false;
        }

        if (
            filtros.documento &&
            turno.documento !== filtros.documento
        ) {
            return false;
        }

        if (
            filtros.especialidad &&
            !turno.especialidad
                .toLowerCase()
                .includes(
                    filtros.especialidad.toLowerCase()
                )
        ) {
            return false;
        }

        if (
            filtros.confirmado !== undefined &&
            turno.confirmado !== filtros.confirmado
        ) {
            return false;
        }

        return true;
    });
}
    async crear(
        datos: TurnoInput
    ): Promise<Turnos> {

        const turnos =
            await this.repository.obtenerTodos();

        const nuevoId =
            turnos.length > 0
                ? Math.max(
                    ...turnos.map(
                        turno => turno.id
                    )
                ) + 1
                : 1;

        const nuevoTurno: Turnos = {
            id: nuevoId,
            fecha: datos.fecha,
            hora: datos.hora,
            paciente: datos.paciente,
            documento: datos.documento,
            especialidad: datos.especialidad,
            confirmado: datos.confirmado ?? false
        };

        return await this.repository.crear(
            nuevoTurno
        );
    }

    async actualizar(
        id: number,
        datos: TurnoInput
    ): Promise<Turnos | undefined> {

        const turno =
            await this.repository.obtenerPorId(id);

        if (!turno) {
            return undefined;
        }

        const turnoActualizado: Turnos = {
            id: id,
            fecha: datos.fecha,
            hora: datos.hora,
            paciente: datos.paciente,
            documento: datos.documento,
            especialidad: datos.especialidad,
            confirmado: datos.confirmado ?? false
        };

        return await this.repository.actualizar(
            turnoActualizado
        );
    }

    async eliminar(
        id: number
    ): Promise<boolean> {

        const turno =
            await this.repository.obtenerPorId(id);

        if (!turno) {
            return false;
        }

        await this.repository.eliminar(id);

        return true;
    }
}

respuesta generada:

import { Turnos } from "./models/turnos";
import { TurnoInput } from "../../../schemas/turno.schema";
import { TurnoQuery } from "../../../schemas/turno.query.schema";
import { TurnosRepository } from "../../../repositories/turnos.repository";

export class TurnosService {
  constructor(private repository: TurnosRepository) {}

  async obtenerPorId(id: number): Promise<Turnos | undefined> {
    return await this.repository.obtenerPorId(id);
  }

  async obtenerTodos(filtros: TurnoQuery = {}): Promise<Turnos[]> {
    // Recomendado: Delegar filtrado a la DB -> return await this.repository.obtenerTodos(filtros);
    const turnos = await this.repository.obtenerTodos();

    return turnos.filter((turno) => {
      if (filtros.fecha && turno.fecha !== filtros.fecha) {
        return false;
      }

      if (filtros.hora && turno.hora !== filtros.hora) {
        return false;
      }

      if (
        filtros.paciente &&
        !turno.paciente?.toLowerCase().includes(filtros.paciente.toLowerCase())
      ) {
        return false;
      }

      if (filtros.documento && turno.documento !== filtros.documento) {
        return false;
      }

      if (
        filtros.especialidad &&
        !turno.especialidad?.toLowerCase().includes(filtros.especialidad.toLowerCase())
      ) {
        return false;
      }

      if (filtros.confirmado !== undefined) {
        // Convierte a booleano en caso de que el query param llegue como string ("true"/"false")
        const esConfirmadoBool = String(filtros.confirmado).toLowerCase() === "true";
        if (turno.confirmado !== esConfirmadoBool) {
          return false;
        }
      }

      return true;
    });
  }

  async crear(datos: TurnoInput): Promise<Turnos> {
    // Dejar la generación del ID a la DB / Repositorio evita traer todos los registros y previene IDs duplicados
    const nuevoTurno: Omit<Turnos, "id"> = {
      fecha: datos.fecha,
      hora: datos.hora,
      paciente: datos.paciente,
      documento: datos.documento,
      especialidad: datos.especialidad,
      confirmado: datos.confirmado ?? false,
    };

    return await this.repository.crear(nuevoTurno as Turnos);
  }

  async actualizar(id: number, datos: TurnoInput): Promise<Turnos | undefined> {
    const turnoExistente = await this.repository.obtenerPorId(id);

    if (!turnoExistente) {
      return undefined;
    }

    const turnoActualizado: Turnos = {
      id,
      fecha: datos.fecha,
      hora: datos.hora,
      paciente: datos.paciente,
      documento: datos.documento,
      especialidad: datos.especialidad,
      confirmado: datos.confirmado ?? turnoExistente.confirmado,
    };

    return await this.repository.actualizar(turnoActualizado);
  }

  async eliminar(id: number): Promise<boolean> {
    const turnoExistente = await this.repository.obtenerPorId(id);

    if (!turnoExistente) {
      return false;
    }

    await this.repository.eliminar(id);
    return true;
  }
}




#19. Validación de escenarios: Happy Path y Unhappy Path

La API debe validarse tanto en escenarios exitosos como en escenarios de error utilizando Postman.

## Happy Path

Representa una operación realizada correctamente.

Ejemplos:

```http
GET /api/turnos/1
```

Resultado esperado:

```text
200 OK
```

```http
POST /api/turnos
```

con datos válidos.

Resultado esperado:

```text
201 Created
```

## Unhappy Path

Representa una entrada inválida, un recurso inexistente o una condición de error esperada.

Ejemplos:

```http
GET /api/turnos/99999
```

Resultado esperado:

```text
404 Not Found
```

```http
GET /api/turnos/abc
```

Resultado esperado:

```text
400 Bad Request
```

```http
POST /api/turnos
```

con datos inválidos.

Resultado esperado:

```text
400 Bad Request
```

## Matriz de escenarios

| ID | Endpoint | Escenario | Entrada | Resultado esperado |
|---|---|---|---|---|
| HP-01 | `GET /api/turnos` | Happy Path | Sin filtros | `200` |
| HP-02 | `GET /api/turnos/:id` | Happy Path | ID existente | `200` |
| HP-03 | `POST /api/turnos` | Happy Path | Body válido | `201` |
| HP-04 | `PUT /api/turnos/:id` | Happy Path | ID + body válido | `200` |
| HP-05 | `DELETE /api/turnos/:id` | Happy Path | ID existente | `200/204` según implementación |
| UP-01 | `GET /api/turnos/:id` | Unhappy Path | ID inexistente | `404` |
| UP-02 | `GET /api/turnos/:id` | Unhappy Path | ID inválido | `400` |
| UP-03 | `POST /api/turnos` | Unhappy Path | Body inválido | `400` |
| UP-04 | `PUT /api/turnos/:id` | Unhappy Path | ID inexistente | `404` |
| UP-05 | `PUT /api/turnos/:id` | Unhappy Path | Body inválido | `400` |
| UP-06 | `DELETE /api/turnos/:id` | Unhappy Path | ID inexistente | `404` |
| UP-07 | `GET /api/turnos` | Unhappy Path | Query params inválidos | `400` |

## Tests en Postman

### Happy Path — GET

```javascript
pm.test("Debe responder 200", function () {
    pm.response.to.have.status(200);
});

pm.test("La respuesta debe contener estado EXITOSO", function () {
    const json = pm.response.json();
    pm.expect(json.estado).to.eql("EXITOSO");
});

pm.test("Debe devolver datos", function () {
    const json = pm.response.json();
    pm.expect(json.data).to.exist;
});
```

### Unhappy Path — ID inexistente

```javascript
pm.test("Debe responder 404", function () {
    pm.response.to.have.status(404);
});

pm.test("Debe devolver un mensaje de error", function () {
    const json = pm.response.json();
    pm.expect(json.error).to.exist;
});
```

### Unhappy Path — ID inválido

```javascript
pm.test("Debe responder 400", function () {
    pm.response.to.have.status(400);
});

pm.test("Debe informar que el ID es inválido", function () {
    const json = pm.response.json();
    pm.expect(json.error).to.include("ID");
});
```

### Happy Path — POST

```javascript
pm.test("Debe responder 201", function () {
    pm.response.to.have.status(201);
});

pm.test("Debe indicar operación exitosa", function () {
    const json = pm.response.json();
    pm.expect(json.estado).to.eql("EXITOSO");
});

pm.test("Debe devolver el turno creado", function () {
    const json = pm.response.json();
    pm.expect(json.data).to.exist;
    pm.expect(json.data.id).to.exist;
});
```

## Flujo completo de validación del CRUD

```text
GET /api/turnos
        ↓
POST /api/turnos
        ↓
GET /api/turnos/:id
        ↓
PUT /api/turnos/:id
        ↓
GET /api/turnos/:id
        ↓
DELETE /api/turnos/:id
        ↓
GET /api/turnos/:id
```

La última consulta debería devolver `404 Not Found` si el recurso fue eliminado correctamente.

