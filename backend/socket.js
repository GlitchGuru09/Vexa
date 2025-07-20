const socketIo = require('socket.io');
const userModel = require('./models/user.model');
const CaptainModel = require('./models/captain.model');

let io;

function intializeSocket(server) {
    const io = socketIo(server, {
        cors: {
            origin: '*',
            methods: ['GET', 'POST'],
        },
    });

    io.on('connection', (socket) => {
        console.log(`client connected: ${socket.id}`);

        socket.on('join', async (data) => {
            const { userId, userType } = data;

            // console.log("user:", userId, "userType:", userType);

            if (userType === 'user') {
                await userModel.findByIdAndUpdate(userId, {
                    socketId: socket.id,
                });
            } else if (userType === 'captain') {
                await CaptainModel.findByIdAndUpdate(userId, {
                    socketId: socket.id,
                });
            }
        });

        socket.on('update-location-captain', async (data) => {
            const { userId, latitude, longitude } = data;
            if (!userId || !latitude || !longitude) return;

            await CaptainModel.findByIdAndUpdate(userId, {
                location: {
                    type: 'Point',
                    coordinates: [longitude, latitude] // lng, lat
                }
            });
        });

        socket.on('disconnect', () => {
            console.log(`Client disconnected: ${socket.id}`);
        });
    });
}

function sendMessageToSocketId(socketId, message) {
    if (io && socketId) {
        io.to(socketId).emit('message', message);
    } else {
        console.error('Socket not initialized or socketId is missing');
    }
}

module.exports = { intializeSocket, sendMessageToSocketId };
