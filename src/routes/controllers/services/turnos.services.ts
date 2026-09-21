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
        !turno.paciente
          ?.toLowerCase()
          .includes(filtros.paciente.toLowerCase())
      ) {
        return false;
      }

      if (
        filtros.documento !== undefined &&
        turno.documento !== filtros.documento
      ) {
        return false;
      }

      if (
        filtros.especialidad &&
        !turno.especialidad
          ?.toLowerCase()
          .includes(filtros.especialidad.toLowerCase())
      ) {
        return false;
      }

      if (filtros.confirmado !== undefined) {
        const esConfirmadoBool =
          String(filtros.confirmado).toLowerCase() === "true";

        if (turno.confirmado !== esConfirmadoBool) {
          return false;
        }
      }

      return true;
    });
  }

  async crear(datos: TurnoInput): Promise<Turnos> {
    const turnos = await this.repository.obtenerTodos();

    const nuevoId =
        turnos.length > 0
            ? Math.max(...turnos.map((turno) => turno.id)) + 1
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

    return await this.repository.crear(nuevoTurno);
}
  async actualizar(
    id: number,
    datos: TurnoInput
  ): Promise<Turnos | undefined> {
    const turnoExistente =
      await this.repository.obtenerPorId(id);

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
      confirmado:
        datos.confirmado ?? turnoExistente.confirmado,
    };

    return await this.repository.actualizar(
      turnoActualizado
    );
  }

  async eliminar(id: number): Promise<boolean> {
    const turnoExistente =
      await this.repository.obtenerPorId(id);

    if (!turnoExistente) {
      return false;
    }

    await this.repository.eliminar(id);

    return true;
  }
}