const net = require('net');


const commandsa = [
    // Device Level Commands
    {
        name: 'Get Attributes',
        method: 'getAttributes',
        hex: '0x010D'
    },
    {
        name: 'Get Virtual Device List',
        method: 'getVDList',
        hex: '0x011A'
    },
    {
        name: 'Store',
        method: 'store',
        hex: '0x0124'
    },
    {
        name: 'Recall',
        method: 'recall',
        hex: '0x0125'
    },
    {
        name: 'Locate',
        method: 'locate',
        hex: '0x0129'
    },
    {
        name: 'Event Log Subscribe',
        method: 'eventLogSubscribe',
        hex: '0x0115'
    },
    {
        name: 'Event Log Unsubscribe',
        method: 'eventLogUnsubscribe',
        hex: '0x012B'
    },
    {
        name: 'Event Log Request',
        method: 'eventLogRequest',
        hex: '0x012C'
    },
    {
        name: 'Multi-Parameter Set',
        method: 'multiParamSet',
        hex: '0x0100'
    },
    {
        name: 'Parameter Subscribe All',
        method: 'paramSubscribeAll',
        hex: '0x0113'
    },
    {
        name: 'Multi-Parameter Get',
        method: 'multiParamGet',
        hex: '0x0103'
    },
    {
        name: 'Multi-Parameter Subscribe',
        method: 'multiParamSubscribe',
        hex: '0x010F'
    },
    {
        name: 'Multi-Parameter Unsubscribe',
        method: 'multiParamUnsubscribe',
        hex: '0x0112'
    },
    {
        name: 'Multi-Object Parameter Set',
        method: 'multiObjectParamSet',
        hex: '0x0101'
    },
    {
        name: 'Parameter Set Percent',
        method: 'paramSetPercent',
        hex: '0x0102'
    },
    {
        name: 'Parameter Subscribe Percent',
        method: 'paramSubscribePercent',
        hex: '0x0111'
    },

    // Routing-layer messages
    {
        name: 'Get Device Info',
        method: 'discoInfo',
        hex: '0x0000'
    },
    {
        name: 'Reserved 1',
        method: 'reserved1',
        hex: '0x0001'
    },
    {
        name: 'Get Network Info',
        method: 'getNetworkInfo',
        hex: '0x0002'
    },
    {
        name: 'Reserved 3',
        method: 'reserved3',
        hex: '0x0003'
    },
    {
        name: 'Request Address',
        method: 'requestAddress',
        hex: '0x0004'
    },
    {
        name: 'Address Used',
        method: 'addressUsed',
        hex: '0x0005'
    },
    {
        name: 'Set Address',
        method: 'setAddress',
        hex: '0x0006',
    },
    {
        name: 'Goodbye',
        method: 'goodbye',
        hex: '0x0007'
    },
    {
        name: 'Hello',
        method: 'hello',
        hex: '0x0008'
    }
]

// write a search method to find the command that matches the supplied method.


const findCommandByMethoda = (method:string) => {
    const command = commandsa.find(command => command.method.toLowerCase() === method.toLowerCase())
    return command || { name: "", hex: "0000" };
}

// write a search method to find the command that matches the supplied hex value.
const findCommandByHexa = (hex:string) => {
    const command = commandsa.find(command => command.hex.toLowerCase() === hex.toLowerCase())
    return command || { name: "", hex: "0000" };
}

// write a search method to find the error code that matches the supplied name.
const findCommandByNamea = (name: string) => {
    const command = commandsa.find(
      (command) => command.name.toLowerCase() === name.toLowerCase()
    );
    return command || { name: "", hex: "0000" };
  };



interface Header {
    version: number; // UBYTE
    headerLength: number; // UBYTE
    messageLength: number; // ULONG
    addrSource: {
        deviceNumber: number;
        virtualDevice: number;
        object: [number,number,number]
    }
    addrDest:{
        deviceNumber: number;
        virtualDevice: number;
        object: [number,number,number]
    }
    message: {
        id: string;
        name: string;
    }; // UWORD
    flags: {
        reqAck: boolean;
        ack: boolean;
        information: boolean;
        error: boolean;
        guarunteed: boolean;
        multipart: boolean;
        sessionNumber: boolean;
    }; // UWORD
    hopCount?: number; // UBYTE
    sequenceNumber?: number; // UWORD
    sessionNumber?: number;
  }



  const buffer = Buffer.from('02190000004800000000000077f60000000000000024050038', 'hex');
  console.log(decodeHeader(buffer));
  let headerObject:Header = decodeHeader(buffer);
  console.log(decodeHeader(encodeHeader(headerObject)))
  



  function decodeHeader(buffer: Buffer): Header {
  
    const flagsValue = buffer.readUInt16BE(20);
    const flagsBinary = flagsValue.toString(2).padStart(16, '0');

    const header: Header = {
      version: buffer.readUInt8(0), // should be 2
      headerLength: buffer.readUInt8(1), // should be 27
      messageLength: buffer.readUInt32BE(2), // should be 386
      addrSource: {
        deviceNumber: buffer.readUInt16BE(6),
        virtualDevice: buffer.readUInt8(8),
        object: [buffer.readUInt8(9), buffer.readUInt8(10), buffer.readUInt8(11)]
      },
      
      addrDest:{
        deviceNumber: buffer.readUInt16BE(12),
        virtualDevice: buffer.readUInt8(14),
        object: [buffer.readUInt8(15), buffer.readUInt8(16), buffer.readUInt8(17)]
      },
      
      message: {

        id: '0x' + buffer.readUInt16BE(18).toString(16).padStart(4, '0'),
        name: findCommandByHexa('0x' + buffer.readUInt16BE(18).toString(16).padStart(4, '0'))?.name,

      },
      flags: {
        reqAck: flagsBinary.charAt(15) === '1',
        ack: flagsBinary.charAt(14) === '1',
        information: flagsBinary.charAt(13) === '1',
        error: flagsBinary.charAt(12) === '1',
        guarunteed: flagsBinary.charAt(10) === '1',
        multipart: flagsBinary.charAt(9) === '1',
        sessionNumber: flagsBinary.charAt(7) === '1',
      },
      hopCount: buffer.readUInt8(22),
      sequenceNumber: buffer.readUInt16BE(23),
    };

    if (header.headerLength === 27) {
        header.sessionNumber = buffer.readUInt16BE(25); // add session number property if header length is 27
      }

    return header;
  }
  



  function encodeHeader(header: Header): Buffer {
    // Calculate header length
    const headerLength = 25 + (header.sessionNumber ? 2 : 0);
  
    // Create buffer with calculated length
    const buffer = Buffer.alloc(headerLength);
  
    let flags = Array.from({ length: 16 }).fill(0);
    flags[15]= header.flags.reqAck ? '1' : '0';
    flags[14]= header.flags.ack ? '1' : '0';
    flags[13]= header.flags.information ? '1' : '0';
    flags[12]= header.flags.error ? '1' : '0';
    flags[10]= header.flags.guarunteed ? '1' : '0';
    flags[9]= header.flags.multipart ? '1' : '0';
    flags[7]= header.flags.sessionNumber ? '1' : '0';
    
    const flagsString = flags.join('');

    // Write fields to buffer
    buffer.writeUInt8(header.version, 0);
    buffer.writeUInt8(headerLength, 1);
    buffer.writeUInt32BE(header.messageLength, 2);
    buffer.writeUInt16BE(header.addrSource.deviceNumber, 6);
    buffer.writeUInt8(header.addrSource.virtualDevice, 8);
    buffer.writeUInt8(header.addrSource.object[0], 9);
    buffer.writeUInt8(header.addrSource.object[1], 10);
    buffer.writeUInt8(header.addrSource.object[2], 11);
    buffer.writeUInt16BE(header.addrDest.deviceNumber, 12);
    buffer.writeUInt8(header.addrDest.virtualDevice, 14);
    buffer.writeUInt8(header.addrDest.object[0], 15);
    buffer.writeUInt8(header.addrDest.object[1], 16);
    buffer.writeUInt8(header.addrDest.object[2], 17);
    buffer.writeUInt16BE(parseInt(findCommandByMethoda(header.message.name).hex, 16), 18);

    buffer.writeUInt16BE(parseInt(flagsString,2), 20);
    buffer.writeUInt8(header.hopCount || 0, 22);
    buffer.writeUInt16BE(header.sequenceNumber || 0, 23);
  
    if (header.sessionNumber) {
      buffer.writeUInt16BE(header.sessionNumber, 25);
      
    }
  
    return buffer;
  }

  

  