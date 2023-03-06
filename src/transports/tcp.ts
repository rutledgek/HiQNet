import { Socket } from 'net';
import udp from 'node:dgram';



class HiQnetTransportTcpUdp {
    
    private HIQNET_PORT = 3804;
    private tcpSocket: Socket | null;
    private tcpHost: string;
    private udpSocket!: udp.Socket | null;
    private udpPort = 3804;
    

    constructor( tcpHost: string) {
       this.tcpHost = tcpHost;
       this.tcpSocket = new Socket();
       
     
    }

    connect ()
    {
        
        // Create a UDP Socket and bind it to the specified port
        this.udpSocket = udp.createSocket({type: 'udp4', reuseAddr: true})
        this.udpSocket.bind(this.udpPort);
        
        
        // Check if the socket exists and if not create a new one before connecting.
        if (!this.tcpSocket) {
            this.tcpSocket = new Socket();
        }
        
        // Craete a TCP Socet and connect it to the specified hots and port
        this.tcpSocket?.connect({ host: this.tcpHost, port:this.HIQNET_PORT })

        this.tcpSocket.on('connect', () => {
            console.log('Socket connected to server!');
            // Do something once the socket is connected
           
          });
 
        this.tcpSocket.on('error', (error) => {
             console.error(`TCP socket error: ${error.message}`);
           });
 
         this.tcpSocket.on('data', (data) => {
             console.log(`TCP Socket Data: ${data}`)
             this.messageReceived(data);
 
         });
 
         this.udpSocket?.on('message', (message, remote) => {
             
             this.messageReceived(message);
           });
         
         this.udpSocket?.on('listening', () => {
             const address = this.udpSocket?.address();
             console.log(`UDP socket listening on ${address?.address}:${address?.port}`);
           });
    }

    disconnect() 
    {
       this.tcpSocket?.end('Closing the connection');
    }
    sendTcpMessage(msg:Buffer) 
    {
        this.tcpSocket?.write(msg, () =>{
            console.log(`Sent data: ${msg}`);
        })
    }
    sendUdpMessage(msg:Buffer){

        this.udpSocket?.send(msg, 0, msg.length, this.HIQNET_PORT, this.tcpHost, (err) => {
            if (err) {
              console.error('Error sending data:', err);
            } else {
              console.log(`Sent ${msg.length} bytes to ${this.tcpHost}:${this.HIQNET_PORT}`);
            }
          });
    }
    messageReceived(msg:Buffer) 
    {
        console.log(msg.toString('utf8'));



    }

    
}



export default HiQnetTransportTcpUdp;