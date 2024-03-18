const {WebSocket , http , express} = require('../dependencies')
const {sendUserMoney} = require('../utils/ayetUtil')
let clients = {};

const app = express();
const server = http.createServer(app)


const wss = new WebSocket.Server({ server });

wss.on('connection', (ws) => {
    console.log('New client connected');

    ws.on('message', (data) => {
        let message;
        try {
            message = JSON.parse(data);
        } catch (e) {
            console.error('Error parsing message', e);
            return;
        }

        if (message.type === "register" && message.id) {
            // Register the client with the given ID
            clients[message.id] = ws;
            sendUserMoney(clients[message.id] , message.id)
            console.log(`Client registered with ID: ${message.id}`);
        }
    });

    ws.on('close', () => {
        // Remove the client from the clients object on disconnect
        Object.keys(clients).forEach(id => {
            if (clients[id] === ws) {
                console.log(`Client with ID ${id} disconnected`);
                delete clients[id];
            }
        });
    });
});



module.exports = {
    app , server  , wss , clients
}