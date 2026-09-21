export const eventos = {
  TURNO_NUEVO: 'turno:nuevo',
  TURNO_ACTUALIZADO: 'turno:actualizado',
  TURNO_ELIMINADO: 'turno:eliminado',
} as const;

import { WebSocketServer } from 'ws';

const wss = new WebSocketServer({
  port: 8080,
});

console.log('Servidor WebSocket ejecutándose en ws://localhost:8080');

