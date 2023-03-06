import { Socket } from 'net';
import udp from 'node:dgram';
import { createSocket } from 'dgram';



class TcpTransport {

    private udpSocket: udp.Socket | null;
    private tcpSocket: Socket | null;
    private udpPort: number;
    private tcpHost: string;
    private tcpPort: number; 

    constructor(udpPort: number, tcpHost: string, tcpPort: number) {
       this.udpPort = udpPort;
       this.tcpHost = tcpHost;
       this.tcpPort = tcpPort;
    }

    async connect ()
    {
        // Create a UDP Socket and bind it to the specified port
        this.udpSocket = createSocket({type: 'udp4', reuseAddr: true})
        this.udpSocket.bind(this.udpPort);

        // Craete a TCP Socet and connect it to the specified hots and port
        this.tcpSocket = new Socket();
        this.tcpSocket.connect({ host: this.tcpHost, port:this.tcpPort })
    }
}



export default TcpTransport;n