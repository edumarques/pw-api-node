import config from './config/config';
import http from 'http';
import { loggerService } from "./di/services";

const NAMESPACE = 'index';

const app = require('./server');
const httpServer = http.createServer(app);

httpServer.listen(config.server.port, (): void => loggerService.info(NAMESPACE, `Server is running on "${config.server.hostname}:${config.server.port}"`));