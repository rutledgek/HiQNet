import HiQnetTransportTcpUdp from "./transports/tcp"

let transport = new HiQnetTransportTcpUdp('10.100.0.201');

transport.connect()

transport.sendMessage(Buffer.from('021900000048053900000000ffff000000000000000005000005390100100000000000000000000000000000000000100000271001000000000000010a64003fffffff0000000000','hex'))