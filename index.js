import { writeFile } from 'fs';
import http from 'http';
import os from 'os';
import Logger from './logger.js';

const logger = new Logger();

const hostname = '127.0.0.1';
const port = 3000;

logger.on('print computer\'s infos', () => {
    console.log('Completed task!');
});

const information = {
    OSType: os.type(),
    Platform: os.platform(),
    RAM: os.totalmem(),
    USEDRAM: os.totalmem() - os.freemem(),
    CPU: os.cpus()
};

const server = http.createServer((req, res) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    res.end(JSON.stringify(information, null, 2));
});

server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});

writeFile('D:\\Homework\\homework.txt', JSON.stringify(information, null, 2), (err) => {
    if (err) {
        console.error('Error writing file:', err);
        return;
    }
    logger.log('print computer\'s infos');
});
