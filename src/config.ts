const DEV = false

export default {
    dev: DEV,
    name: 'RPC Dash',
    version: 43,
    description: 'Debuno RPC Dashboard',
    srcKey: 'src',
    genKey: 'gen',
    protocolHandler: {
        protocol: DEV ? 'web+rpcdev' : 'web+rpc',
        url: '/#%s'
    }
} as const