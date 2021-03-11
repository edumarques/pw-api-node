import config from "./config/config";
import logging from "./config/logging";
import http from "http";

const NAMESPACE = 'index';

const app = require('./server');
const httpServer = http.createServer(app);

httpServer.listen(config.server.port, (): void => logging.info(NAMESPACE, `Server is running on ${config.server.hostname}:${config.server.port}`));