const express = require('express');
const path = require('path');

const app = express();

async function bootstrap() {
    app.use(express.json());
    app.use(express.urlencoded({ extended: false }));
    app.use(express.static(path.join(__dirname, 'public-flutter')));
    app.listen(8000);
}

bootstrap();

module.exports = app;