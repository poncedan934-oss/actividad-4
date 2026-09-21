import { Medico } from "./models/medico";
import { MedicosRepository } from "../../../repositories/medicos.repository";
import { MedicoInput } from "../../../schemas/medico.schema";
import { MedicoQuery } from "../../../schemas/medico.query.schema";

export class MedicosService {
  constructor(private repository: MedicosRepository) {}

  async obtenerPorId(id: number): Promise<Medico | undefined> {
    return await this.repository.obtenerPorId(id);
}

  async obtenerTodos(filtros: MedicoQuery = {}): Promise<Medico[]> {
    const medicos = await this.repository.obtenerTodos();

    return medicos.filter((medico) => {
      if (filtros.fecha && medico.fecha !== filtros.fecha) {
        return false;
      }

      if (filtros.hora && medico.hora !== filtros.hora) {
        return false;
      }

      if (
        filtros.paciente &&
        !medico.paciente
          ?.toLowerCase()
          .includes(filtros.paciente.toLowerCase())
      ) {
        return false;
      }

      if (
        filtros.documento !== undefined &&
        medico.documento !== filtros.documento
      ) {
        return false;
      }

      if (
        filtros.especialidad &&
        !medico.especialidad
          ?.toLowerCase()
          .includes(filtros.especialidad.toLowerCase())
      ) {
        return false;
      }

      if (filtros.confirmado !== undefined) {
        const esConfirmadoBool =
          String(filtros.confirmado).toLowerCase() === "true";

        if (medico.confirmado !== esConfirmadoBool) {
          return false;
        }
      }

      return true;
    });
  }

 async crear(datos: MedicoInput): Promise<Medico> {
    const turnos = await this.repository.obtenerTodos();

    const nuevoId =
        turnos.length > 0
            ? Math.max(...turnos.map((turno) => turno.id)) + 1
            : 1;

    const nuevoTurno: Medico = {
        id: nuevoId,
        nombre: datos.nombre,
        apellido: datos.apellido,
        especialidad: datos.especialidad,
        matricula: datos.matricula
    };

    return await this.repository.crear(nuevoTurno);
}
  async actualizar(
    id: number,
    datos: MedicoInput
  ): Promise<Medico | undefined> {
    const medicoExistente =
      await this.repository.obtenerPorId(id);

    if (!medicoExistente) {
      return undefined;
    }

    const medicoActualizado: Medico = {
      id,
      nombre: datos.fecha,
      apellido: datos.hora,
      especialidad: datos.especialidad,
      matricula: datos.documento,
      confirmado:
        datos.confirmado ?? medicoExistente.confirmado,
    };
    return await this.repository.actualizar(
      medicoActualizado
    );
  }

  async eliminar(id: number): Promise<boolean> {
    const medicoExistente =
      await this.repository.obtenerPorId(id);

    if (!medicoExistente) {
      return false;
    }

    await this.repository.eliminar(id);

    return true;
  }
}