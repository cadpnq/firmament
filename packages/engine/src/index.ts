import express from 'express';
import ws from 'ws';
import { applyWSSHandler } from '@trpc/server/adapters/ws';
import { appRouter } from './routers/root';
import { logger } from './utils/logger';

const app = express();
const wsServer = new ws.Server({ noServer: true });

const handler = applyWSSHandler({ wss: wsServer, router: appRouter });

app.get('/health', (req, res) => {
  res.send('healthy');
});

// TODO: this should be pulled from the environment.
const server = app.listen(9001, () => {
  logger.info('Listening on port 9001');
});
server.on('upgrade', (request, socket, head) => {
  wsServer.handleUpgrade(request, socket, head, (socket) => {
    wsServer.emit('connection', socket, request);
  });
});

process.on('SIGTERM', () => {
  handler.broadcastReconnectNotification();
  server.close();
  wsServer.close();
});
