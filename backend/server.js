const http = require('http');
const app = require('./app');

const PORT = process.env.PORT || 3000;



const server = http.createServer(app);



server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
server.on('error', (error) => {
    console.error(`Server error: ${error.message}`);
});