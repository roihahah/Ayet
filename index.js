const { express, mongoose, WebSocket , dotenv , http } = require('./dependencies');
const {app , server} = require('./socket/socket')

app.use(express.json());

app.use('/' , require('./routes/ayetRoutes'))


//database connection
 mongoose.connect(process.env.MONGO_URL).then(() =>{
    console.log('--DATABASE CONNECTED SECCUCFULLY')
}).catch((err) => console.log('--DATABASE CONNECTION FAILD :(' , err))

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});



