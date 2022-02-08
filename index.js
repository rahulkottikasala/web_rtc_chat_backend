const app = require('express')();
const server = require('http').createServer(app);
const cors = require('cors')

const io = require('socket.io')(server,{
    cors:{
        origin: "*",
        method:[ "GET","POST"]

    }
});
 app.use(cors());
const PORT = process.env.PORT || 5000;

app.get("/",(req, res) => {
res.send("server is listening ....")
})

io.on("connection", (socket) => {
    socket.emit('me', socket.id);
    socket.on('disconnect', () => {
        socket.brodcast.emit('callended')
    });
    socket.on('calluser', ({userTocall, signalData, from, name}) =>{
io.to(usercall).emit("calluse",{ signal: signalData, from, name });
    });
    socket.om ('ánswercall', (data) => {
        io.to(data.to).emit('callaccepted', data.signal);
    })
})



server.listen(PORT,() => {
    console.log(`server listening on port ${PORT}`);
});