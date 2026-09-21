los datos indispensables para ambas entidades son:
para turnos
  "fecha"
    "hora"
    "paciente"
    "documento"
    "especialidad"
y para medicos
   "nombre"
    "apellido"
    "especialidad"
    "matricula"

los nuevos endpoints RESTful según las convenciones de Clean Architecture:
GET http://localhost:3000/api/turnos/1
POST http://localhost:3000/api/turnos
GET http://localhost:3000/api/medicos/1
POST http://localhost:3000/api/medicos