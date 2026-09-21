export interface Turnos {
    id: number;
    paciente: string;
    documento: number;
    especialidad: string;
    fecha: number;
    hora: number;
    confirmado: boolean;
}