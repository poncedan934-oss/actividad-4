import { WebSocketServer } from 'ws';
import { EventEmitter } from 'node:events';
import { eventos } from './eventos.js';

const eventBus = new EventEmitter();

const wss = new WebSocketServer({
  port: 8080,
});

console.log('Servidor WebSocket ejecutándose en ws://localhost:8080');

wss.on('connection', (ws) => {
  console.log('Cliente WebSocket conectado');

  ws.on('close', () => {
    console.log('Cliente WebSocket desconectado');
  });
});

function transmitirEvento(
  evento: string,
  datos: unknown
) {
  const mensaje = JSON.stringify({
    evento,
    datos,
  });

  wss.clients.forEach((cliente) => {
    if (cliente.readyState === 1) {
      cliente.send(mensaje);
    }
  });
}

eventBus.on(eventos.TURNO_NUEVO, (turno: unknown) => {
  transmitirEvento(eventos.TURNO_NUEVO, turno);
});

eventBus.on(eventos.TURNO_ACTUALIZADO, (turno: unknown) => {
  transmitirEvento(eventos.TURNO_ACTUALIZADO, turno);
});

eventBus.on(eventos.TURNO_ELIMINADO, (turno: unknown) => {
  transmitirEvento(eventos.TURNO_ELIMINADO, turno);
});

