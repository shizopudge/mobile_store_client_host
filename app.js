const fs = require('fs');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const https = require('https');
const privateKey  = fs.readFileSync('server.key', 'utf8');
const certificate = fs.readFileSync('server.cert', 'utf8');

const app = express();

const credentials = {key: privateKey, cert: certificate};

async function bootstrap() {
    console.log(credentials);
    app.use(express.json());
    app.use(express.urlencoded({ extended: false }));
    app.use(cookieParser());
    app.use(express.static(path.join(__dirname, 'public-flutter')));
    const httpsServer = https.createServer(credentials, app);
    httpsServer.listen(8000)
}

bootstrap();

module.exports = app;