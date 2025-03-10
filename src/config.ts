export default {
    name: 'RPC Dash',
    description: 'Debuno RPC Dashboard',
    srcKey: 'src',
    genKey: 'gen',
    protocolHandler: {
        protocol: 'web+rpc',
        url: '/?handle=%s'
    }
} as const