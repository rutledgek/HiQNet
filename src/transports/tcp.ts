import { Socket } from 'net';
// import udp from 'node:dgram';



class HiQnetTransportTcpUdp {
    
    private HIQNET_PORT = 3804;
    private tcpSocket!: Socket | null;
    private tcpHost: string;
    // private udpSocket!: udp.Socket | null;
    // private udpPort: number;
    

    constructor( tcpHost: string) {
    //    this.udpPort = udpPort;
       this.tcpHost = tcpHost;
       this.tcpSocket = new Socket();
       this.tcpSocket.connect({ host: this.tcpHost, port:this.HIQNET_PORT })
       this.tcpSocket.on('connect', () => {
           console.log('Socket connected to server!');
           // Do something once the socket is connected
          
         });
    }

    connect ()
    {
        /*
        // Create a UDP Socket and bind it to the specified port
        this.udpSocket = createSocket({type: 'udp4', reuseAddr: true})
        this.udpSocket.bind(this.udpPort);
        */
        // Craete a TCP Socet and connect it to the specified hots and port
        this.tcpSocket = new Socket();
        this.tcpSocket.connect({ host: this.tcpHost, port:this.HIQNET_PORT })
        this.tcpSocket.on('connect', () => {
            console.log('Socket connected to server!');
            // Do something once the socket is connected
           
          });
    }

    disconnect() 
    {
       this.tcpSocket?.end('Closing the connection');
    }
}



export default HiQnetTransportTcpUdp;