# Modelado de Pacientes y Turnos

## 1. Introducción

Este documento describe el modelado conceptual de las entidades **Paciente** y **Turno** dentro de la API de gestión de turnos médicos.

También se documentan dos nuevos endpoints RESTful relacionados con estas entidades, siguiendo las convenciones de una arquitectura por capas inspirada en **Clean Architecture**.

La comunicación entre las diferentes capas se organiza de la siguiente manera:

```text
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
 Persistencia
```

Cada capa posee una responsabilidad específica y evita concentrar toda la lógica de la aplicación en los controladores.

---

# 2. Modelado conceptual

## 2.1 Entidad Paciente

Un **Paciente** representa a la persona que solicita o posee un turno médico.

Conceptualmente, un paciente puede identificarse mediante un identificador único y almacenar información básica necesaria para gestionar sus turnos.

Una representación conceptual puede ser:

```text
Paciente
├── id
├── nombre
├── apellido
└── documento
```

### Atributos

| Campo       | Tipo   | Descripción                      |
| ----------- | ------ | -------------------------------- |
| `id`        | number | Identificador único del paciente |
| `nombre`    | string | Nombre del paciente              |
| `apellido`  | string | Apellido del paciente            |
| `documento` | number | Documento identificatorio        |

El campo `id` permite diferenciar de manera única a cada paciente.

El `documento` permite identificar al paciente mediante un dato utilizado habitualmente en el contexto administrativo de una consulta médica.

---

## 2.2 Entidad Turno

Un **Turno** representa una reserva para una atención médica en una fecha y horario determinados.

El modelo utilizado actualmente por el proyecto contiene:

```text
Turno
├── id
├── fecha
├── hora
├── paciente
├── documento
├── especialidad
└── confirmado
```

### Atributos

| Campo          | Tipo    | Descripción                       |
| -------------- | ------- | --------------------------------- |
| `id`           | number  | Identificador único del turno     |
| `fecha`        | string  | Fecha asignada al turno           |
| `hora`         | string  | Hora asignada                     |
| `paciente`     | string  | Nombre del paciente asociado      |
| `documento`    | number  | Documento del paciente            |
| `especialidad` | string  | Especialidad médica               |
| `confirmado`   | boolean | Indica si el turno fue confirmado |

Ejemplo:

```json
{
  "id": 1,
  "fecha": "2026-09-01",
  "hora": "11:30",
  "paciente": "Juan Lopez",
  "documento": 2853267,
  "especialidad": "Dermatología",
  "confirmado": true
}
```

---

# 3. Relación conceptual entre Paciente y Turno

Desde el punto de vista conceptual, existe una relación entre las entidades:

```text
Paciente
   │
   │ posee
   │
   ▼
 Turno
```

Un paciente puede tener uno o varios turnos a lo largo del tiempo.

Por lo tanto, conceptualmente:

```text
1 Paciente ─────────── N Turnos
```

Esto significa que un mismo paciente puede reservar diferentes turnos en fechas y horarios distintos.

Por ejemplo:

```text
Paciente
Juan Lopez
Documento: 2853267
       │
       ├── Turno 1
       │   01/09/2026 - 11:30
       │   Dermatología
       │
       └── Turno 2
           15/09/2026 - 09:00
           Cardiología
```

En la implementación actual, la información del paciente se encuentra representada directamente dentro del recurso `Turno` mediante los campos `paciente` y `documento`.

Por lo tanto, esta relación es principalmente **conceptual** y no implica necesariamente que exista actualmente una tabla o archivo independiente de pacientes.

---

# 4. Separación de responsabilidades

Para mantener una arquitectura limpia, los endpoints no deberían contener toda la lógica de la aplicación.

La responsabilidad se distribuye entre las diferentes capas.

## Routes

Las rutas definen:

* Método HTTP.
* Path del recurso.
* Controlador que debe procesar la solicitud.

Ejemplo:

```ts
router.get("/pacientes/:id/turnos", controller.obtenerTurnosPorPaciente);
```

---

## Controllers

Los controllers son responsables de la interacción HTTP.

Sus responsabilidades incluyen:

* Recibir `Request` y `Response`.
* Obtener parámetros de la URL.
* Obtener query params.
* Obtener información del body.
* Validar entradas.
* Invocar al service.
* Construir la respuesta HTTP.
* Utilizar los códigos de estado correspondientes.

El controller no debería acceder directamente al archivo JSON.

---

## Services

Los services contienen la lógica de negocio.

Por ejemplo:

```text
Controller
    │
    ▼
Service
    │
    ├── valida reglas de negocio
    └── solicita información al Repository
```

El service no debería encargarse de construir respuestas HTTP.

---

## Repositories

El repository es responsable de la persistencia.

En el proyecto actual la persistencia se realiza mediante archivos JSON.

Por ejemplo:

```text
Service
   │
   ▼
TurnosRepository
   │
   ▼
turnos.json
```

El repository se ocupa de:

* Leer información.
* Buscar registros.
* Crear registros.
* Actualizar registros.
* Eliminar registros.
* Guardar cambios.

---

# 5. Nuevos endpoints RESTful

Se definen los siguientes endpoints relacionados con pacientes y turnos:

```text
GET /api/pacientes/:id/turnos
POST /api/pacientes/:id/turnos
```

Estos endpoints utilizan el recurso `pacientes` y permiten trabajar con la colección de turnos asociada a un paciente.

---

# 6. Endpoint 1 — Obtener turnos de un paciente

## Método HTTP

```http
GET
```

## Path

```http
/api/pacientes/:id/turnos
```

## Descripción funcional

Permite obtener todos los turnos asociados a un paciente determinado.

El identificador del paciente se recibe mediante un parámetro de ruta.

Ejemplo:

```http
GET /api/pacientes/1/turnos
```

El controller recibe el identificador y delega la operación al service correspondiente.

---

## Parámetros

### Params

| Parámetro | Tipo   | Obligatorio | Descripción                |
| --------- | ------ | ----------- | -------------------------- |
| `id`      | number | Sí          | Identificador del paciente |

Ejemplo:

```text
id = 1
```

### Query Params

No son necesarios para realizar la operación básica.

Podrían incorporarse posteriormente filtros como:

```text
?fecha=2026-09-01
?especialidad=Cardiología
?confirmado=true
```

pero estos filtros deben implementarse explícitamente antes de documentarlos como parte del contrato definitivo del endpoint.

### Body

El método `GET` no requiere body JSON.

---

## Respuesta exitosa

### 200 OK

Ejemplo:

```json
{
  "estado": "EXITOSO",
  "data": [
    {
      "id": 1,
      "fecha": "2026-09-01",
      "hora": "11:30",
      "paciente": "Juan Lopez",
      "documento": 2853267,
      "especialidad": "Dermatología",
      "confirmado": true
    }
  ]
}
```

---

## Respuestas de error

### 400 Bad Request

Se utiliza cuando el identificador enviado no es válido.

Ejemplo:

```http
GET /api/pacientes/abc/turnos
```

Respuesta:

```json
{
  "error": "El ID debe ser un entero positivo"
}
```

### 404 Not Found

Se utiliza cuando no existe el paciente solicitado.

```json
{
  "error": "Paciente no encontrado"
}
```

### 401 Unauthorized

Si el endpoint se encuentra protegido mediante JWT y no se proporciona un token válido:

```json
{
  "error": "No autorizado"
}
```

### 500 Internal Server Error

Cuando ocurre un error inesperado durante el procesamiento:

```json
{
  "error": "Error interno del servidor"
}
```

---

# 7. Endpoint 2 — Crear un turno para un paciente

## Método HTTP

```http
POST
```

## Path

```http
/api/pacientes/:id/turnos
```

## Descripción funcional

Permite crear un nuevo turno asociado a un paciente determinado.

El paciente se identifica mediante el parámetro `id`.

Ejemplo:

```http
POST /api/pacientes/1/turnos
```

---

## Parámetros

### Params

| Parámetro | Tipo   | Obligatorio | Descripción                |
| --------- | ------ | ----------- | -------------------------- |
| `id`      | number | Sí          | Identificador del paciente |

### Query Params

No utiliza query params para crear el recurso.

### Body JSON

El cuerpo de la solicitud contiene los datos necesarios para crear el turno:

```json
{
  "fecha": "2026-09-25",
  "hora": "15:30",
  "especialidad": "Cardiología",
  "confirmado": false
}
```

El paciente no necesita repetirse en el body porque se obtiene mediante el `id` presente en la URL.

---

# 8. Respuesta exitosa

### 201 Created

Ejemplo:

```json
{
  "estado": "EXITOSO",
  "data": {
    "id": 5,
    "fecha": "2026-09-25",
    "hora": "15:30",
    "paciente": "Juan Lopez",
    "documento": 2853267,
    "especialidad": "Cardiología",
    "confirmado": false
  }
}
```

El código `201 Created` indica que el recurso fue creado correctamente.

---

# 9. Respuestas de error

### 400 Bad Request

Se utiliza cuando los datos enviados en el body no cumplen con las reglas de validación.

Ejemplo:

```json
{
  "fecha": "",
  "hora": "",
  "especialidad": ""
}
```

Respuesta:

```json
{
  "error": "Los datos del turno no son válidos"
}
```

### 404 Not Found

Si el paciente indicado mediante `:id` no existe:

```json
{
  "error": "Paciente no encontrado"
}
```

### 401 Unauthorized

Si se requiere autenticación y no existe un JWT válido:

```json
{
  "error": "No autorizado"
}
```

### 500 Internal Server Error

Ante un error inesperado:

```json
{
  "error": "Error al crear turno"
}
```

---

# 10. Flujo según Clean Architecture

## GET /api/pacientes/:id/turnos

El flujo de ejecución sería:

```text
GET /api/pacientes/1/turnos
             │
             ▼
      pacientes.routes.ts
             │
             ▼
     pacientes.controller.ts
             │
             ▼
       pacientes.service.ts
             │
             ▼
        turnos.repository.ts
             │
             ▼
          turnos.json
```

El resultado vuelve por las mismas capas hasta generar la respuesta HTTP.

---

## POST /api/pacientes/:id/turnos

El flujo sería:

```text
POST /api/pacientes/1/turnos
             │
             ▼
      pacientes.routes.ts
             │
             ▼
     pacientes.controller.ts
             │
             ▼
       pacientes.service.ts
             │
             ▼
        turnos.repository.ts
             │
             ▼
          turnos.json
```

En este caso el service aplica las reglas necesarias para construir el nuevo turno antes de solicitar al repository que lo persista.

---

# 11. Ejemplo de definición de rutas

La capa de routes podría definir los endpoints de esta manera:

```ts
router.get(
  "/pacientes/:id/turnos",
  controller.obtenerTurnosPorPaciente
);

router.post(
  "/pacientes/:id/turnos",
  controller.crearTurnoParaPaciente
);
```

Las rutas solamente establecen la correspondencia entre HTTP y el controller.

No deberían contener la lógica de acceso a `turnos.json`.

---

# 12. Ejemplo conceptual del Controller

El controller podría recibir el `id`, validar la entrada y delegar al service:

```ts
obtenerTurnosPorPaciente = async (
  req: Request,
  res: Response
): Promise<void> => {

  try {
    const id = Number(req.params.id);

    if (!Number.isInteger(id) || id <= 0) {
      throw new AppError(
        "El ID debe ser un entero positivo",
        400
      );
    }

    const turnos =
      await this.service.obtenerTurnosPorPaciente(id);

    return res.status(200).json({
      estado: "EXITOSO",
      data: turnos
    });

  } catch (error) {

    if (error instanceof AppError) {
      return res.status(error.statusCode).json({
        error: error.message
      });
    }

    return res.status(500).json({
      error: "Error al obtener turnos"
    });
  }
};
```

El código anterior es un ejemplo conceptual. Debe adaptarse a las clases y rutas que realmente existan en el proyecto.

---

# 13. Ejemplo conceptual del Service

El service contiene la operación de negocio:

```ts
async obtenerTurnosPorPaciente(
  pacienteId: number
): Promise<Turnos[]> {

  const turnos =
    await this.repository.obtenerTodos();

  return turnos.filter(
    turno => turno.documento === pacienteId
  );
}
```

La implementación definitiva debe utilizar el criterio de identificación que adopte el modelo `Paciente`.

Si se incorpora un `pacienteId` explícito en `Turno`, el filtrado debería realizarse utilizando ese identificador.

---

# 14. Consideración sobre el modelo actual

Actualmente el recurso `Turno` contiene:

```text
paciente
documento
```

pero no contiene explícitamente:

```text
pacienteId
```

Por lo tanto, para implementar una relación formal entre las entidades sería conveniente evolucionar el modelo hacia:

```json
{
  "id": 1,
  "pacienteId": 1,
  "fecha": "2026-09-01",
  "hora": "11:30",
  "especialidad": "Dermatología",
  "confirmado": true
}
```

De esta manera:

```text
Paciente
id = 1
   │
   │
   └──────────────► Turno
                    pacienteId = 1
```

Esto permite establecer una referencia explícita entre ambas entidades.

La modificación debe realizarse de forma coordinada en:

```text
Model
Schema
Service
Repository
Controller
Persistencia JSON
```

para mantener consistente el contrato de la API.

---

# 15. Resumen

Los dos endpoints definidos son:

| Método | Path                        | Función                           | Éxito         |
| ------ | --------------------------- | --------------------------------- | ------------- |
| `GET`  | `/api/pacientes/:id/turnos` | Obtener los turnos de un paciente | `200 OK`      |
| `POST` | `/api/pacientes/:id/turnos` | Crear un turno para un paciente   | `201 Created` |

La separación de responsabilidades propuesta es:

```text
Routes
  ↓
Controllers
  ↓
Services
  ↓
Repositories
  ↓
Persistencia
```

De esta manera, las rutas gestionan el acceso HTTP, los controllers gestionan la comunicación HTTP, los services concentran las reglas de negocio y los repositories gestionan la persistencia de los datos.
