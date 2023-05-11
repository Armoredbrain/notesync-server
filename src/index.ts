import { io } from "./ioServer";

(async () => {
    try {
        io.listen(7777);
        console.log("Websocket server is up");
    } catch (error) {
        console.log(error);
    }
})();
