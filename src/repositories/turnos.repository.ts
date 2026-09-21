import fs from "node:fs/promises";
import path from "node:path";
import { Turnos } from "../routes/controllers/services/models/turnos";

const archivo = path.join(
  process.cwd(),
  "turnos.json"
);

export class TurnosRepository {

  async obtenerTodos(): Promise<Turnos[]> {
    const datos = await fs.readFile(
      archivo,
      "utf-8"
    );

    return JSON.parse(datos);
  }

 async obtenerPorId(id: number): Promise<Turnos | undefined> {
    const turnos = await this.obtenerTodos();

    return turnos.find((turno) => turno.id === id);
}


 async crear(turno: Turnos): Promise<Turnos> {
    const turnos = await this.obtenerTodos();

    turnos.push(turno);

    await fs.writeFile(
        archivo,
        JSON.stringify(turnos, null, 2)
    );

    return turno;
}

  async actualizar(
    turnoActualizado: Turnos
  ): Promise<Turnos> {

    const turnos =
      await this.obtenerTodos();

    const indice =
      turnos.findIndex(
        (turno) =>
          turno.id ===
          turnoActualizado.id
      );

    if (indice === -1) {
      throw new Error(
        "Turno no encontrado"
      );
    }

    turnos[indice] =
      turnoActualizado;

    await fs.writeFile(
      archivo,
      JSON.stringify(
        turnos,
        null,
        2
      )
    );

    return turnoActualizado;
  }

  async eliminar(
    id: number
  ): Promise<void> {

    const turnos =
      await this.obtenerTodos();

    const nuevosTurnos =
      turnos.filter(
        (turno) => turno.id !== id
      );

    await fs.writeFile(
      archivo,
      JSON.stringify(
        nuevosTurnos,
        null,
        2
      )
    );
  }
}