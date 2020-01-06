import path from 'path';
import express from 'express';
import socketIO from 'socket.io';
import { Lib } from 'lance-gg';
import WiggleServerEngine from './server/WiggleServerEngine';
import WiggleGameEngine from './common/WiggleGameEngine';

const PORT = process.env.PORT || 8080;
const INDEX = path.join(__dirname, '../dist/index.html');

// define routes and socket
const server = express();
server.get('/', function(req, res) { res.sendFile(INDEX); });
server.use('/game/wiggle', express.static(path.join(__dirname, '../dist/')));
let requestHandler = server.listen(PORT, () => console.log(`Listening on ${ PORT }`));
const io = socketIO(requestHandler);

// Game Instances
const gameEngine = new WiggleGameEngine({ traceLevel: Lib.Trace.TRACE_NONE });
const serverEngine = new WiggleServerEngine(io, gameEngine, { debug: {}, updateRate: 6 });

// start the game
serverEngine.start();
