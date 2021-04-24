const http = require('http');

const ExpressApp = require('./configs/app');
const MongoDBAtlas = require('./configs/db');


const port = process.env.PORT || 3000;
console.log(`Node Server Port Number : ${port}`);

const server = http.createServer(ExpressApp);

server.listen(port, () => {
    MongoDBAtlas.estbConnection();
    console.log('Connected to Node Server...');
});