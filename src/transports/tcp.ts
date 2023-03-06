import { Socket } from 'net';
import udp from 'node:dgram';
import { createSocket } from 'dgram';



class TcpTransport {

    private udpSocket: DgramSocket | null;
    private tcpSocket: Socket | null;

    constructor(udpPort: number, tcpHost: string, tcpPort: number) {
        // Create a UDP Socket and bind it to the specified port
        this.udpSocket = createSocket({type: 'udp4', reuseAddr: true})
        this.udpSocket.bind(udpPort);

        // Craete a TCP Socet and connect it to the specified hots and port
        this.tcpSocket = new Socket();
        this.tcpSocket.connect({ host: tcpHost, port:tcpPort })
    
    }


}




export default TcpTransport;n