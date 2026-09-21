import fs from "node:fs/promises";
import path from "node:path";
import { Medico } from "../routes/controllers/services/models/medico";

const archivo = path.join(
    process.cwd(),
    "medicos.json"
);

export class MedicosRepository {

    async obtenerTodos(): Promise<Medico[]> {

    const datos =
        await fs.readFile(
            archivo,
            "utf-8"
        );

    return JSON.parse(datos);
}
async obtenerPorId(id: number): Promise<Medico | undefined> {
    const medicos = await this.obtenerTodos();

    return medicos.find((medico) => medico.id === id);
}

    async crear(medico: Medico): Promise<Medico> {
    const medicos = await this.obtenerTodos();

    medicos.push(medico);

    await fs.writeFile(
        archivo,
        JSON.stringify(medicos, null, 2)
    );

    return medico;
}

    async actualizar(medicoActualizado: Medico): Promise<Medico> {
        const medicos = await this.obtenerTodos();

        const indice = medicos.findIndex(
            medico => medico.id === medicoActualizado.id
        );

        if (indice === -1) {
            throw new Error("Médico no encontrado");
        }

        medicos[indice] = medicoActualizado;

        await fs.writeFile(
            archivo,
            JSON.stringify(medicos, null, 2)
        );

        return medicoActualizado;
    }

  async eliminar(id: number): Promise<boolean> {

    const medicos =
        await this.obtenerTodos();

    const nuevosMedicos =
        medicos.filter(
            medico => medico.id !== id
        );

    if (nuevosMedicos.length === medicos.length) {
        return false;
    }

    await fs.writeFile(
        archivo,
        JSON.stringify(nuevosMedicos, null, 2)
    );

    return true;
}
    }
