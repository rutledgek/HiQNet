// import { IPAddress } from 'ip-address';


// write an array of objects of hiqnet commands and two methods for searching the array by command name and by command hex value.

const commands = [
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
const findCommandByMethod = (method:string) => {
    return commands.find(command => command.method === method)
}

// write a search method to find the command that matches the supplied hex value.
const findCommandByHex = (hex:string) => {
    return commands.find(command => command.hex === hex)
}

// write a search method to find the error code that matches the supplied name.
const findCommandByName = (name:string) => {    
    return commands.find(command => command.name === name)
}

// Error codes from Third Party Programmer Documentation page 34/35.
// Each error code has a small explanation there.
const errorCodes = [
	{
        name: 'Invalid Version',
        method: 'invalidVersion',
        hex: '0x0001'
        },
        {
        name: 'Invalid Length',
        method: 'invalidLength',
        hex: '0x0002'
        },
        {
        name: 'Invalid Virtual Device',
        method: 'invalidVirtualDevice',
        hex: '0x0003'
        },
        {
        name: 'Invalid Object',
        method: 'invalidObject',
        hex: '0x0004'
        },
        {
        name: 'Invalid Parameter',
        method: 'invalidParameter',
        hex: '0x0005'
        },
        {
        name: 'Invalid Message ID',
        method: 'invalidMessageID',
        hex: '0x0006'
        },
        {
        name: 'Invalid Value',
        method: 'invalidValue',
        hex: '0x0007'
        },
        {
        name: 'Resource Unavailable',
        method: 'resourceUnavailable',
        hex: '0x0008'
        },
        {
        name: 'Unsupported',
        method: 'unsupported',
        hex: '0x0009'
        },
        {
        name: 'Invalid Virtual Device Class',
        method: 'invalidVirtualDeviceClass',
        hex: '0x000A'
        },
        {
        name: 'Invalid Object Class',
        method: 'invalidObjectClass',
        hex: '0x000B'
        },
        {
        name: 'Invalid Parameter Class',
        method: 'invalidParameterClass',
        hex: '0x000C'
        },
        {
        name: 'Invalid Attribute ID',
        method: 'invalidAttributeID',
        hex: '0x000D'
        },
        {
        name: 'Invalid Data Type',
        method: 'invalidDataType',
        hex: '0x000E'
        },
        {
        name: 'Invalid Configuration',
        method: 'invalidConfiguration',
        hex: '0x000F'
        },
        {
        name: 'Flash Error',
        method: 'flashError',
        hex: '0x0010'
        },
        {
        name: 'Not a Router',
        method: 'notARouter',
        hex: '0x0011'
        }
];


// write a search method to find the error code that matches the supplied method.
const findErrorCodeByMethod = (method:string) => {
    return errorCodes.find(errorCode => errorCode.method === method)
}

// write a search method to find the error code that matches the supplied hex value.
const findErrorCodeByHex = (hex:string) => {
    return errorCodes.find(errorCode => errorCode.hex === hex)
}

// write a search method to find the error code that matches the supplied name.
const findErrorCodeByName = (name:string) => {
    return errorCodes.find(errorCode => errorCode.name === name)
}


class HiQnet {
    transport: any;
    cbUnsolicitedMessage: any;
    pendingMessages: any[];

    constructor(transport:any, cbUnsolicitedMessage:any) {
        this.transport = transport;
        // this.transport.callback = msg => this.recv(msg);
        this.cbUnsolicitedMessage = cbUnsolicitedMessage;
        this.pendingMessages = [];
    }











}