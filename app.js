var fs = require('fs');
const express = require('express');
const path = require('path');
var cookieParser = require('cookie-parser');
var http = require('http');
const https = require('https');
const privateKey  = fs.readFileSync('client-key.pem');
const certificate = fs.readFileSync('client.csr');

const app = express();

const credentials = {key: privateKey, cert: certificate};

async function bootstrap() {
    console.log(credentials);
    app.use(express.json());
    app.use(express.urlencoded({ extended: false }));
    app.use(cookieParser());
    app.use(express.static(path.join(__dirname, 'public-flutter')));
    const httpServer = http.createServer(app);
    const httpsServer = https.createServer(credentials, app);
    httpServer.listen(8080)
    httpsServer.listen(8443)
}

bootstrap();

module.exports = app;