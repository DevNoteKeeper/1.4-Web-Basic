const http = require("http");
const server = http.createServer(onRequest);

server.listen(3000);

function onRequest(request, response){
    console.log("a log");
    response.write("Hello");
    response.write("Hello");
    response.end();
}