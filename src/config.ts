export default {
    name: 'RPC Dash',
    version: 37,
    description: 'Debuno RPC Dashboard',
    srcKey: 'src',
    genKey: 'gen',
    protocolHandler: {
        protocol: 'web+rpc',
        url: '/#%s'
    }
} as const