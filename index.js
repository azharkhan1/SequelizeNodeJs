const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const http = require('http');
const routes = require('./routes/api');
const { sequelize } = require('./app/models');
const PORT = 5000 || process.env.PORT;
const app = express()
const server = http.createServer(app);



process.on('unhandledRejection', ex => {
    throw ex;
})

app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use('/', routes);

server.listen(PORT, async () => {
    await sequelize
        .authenticate()
    console.log('database connected');

})