
// @ts-ignore .
const ENV = RPC_ENV
// @ts-ignore .
const VER = DASH_VERSION
const DEV = ENV === 'dev'

export default {
    dev: DEV,
    name: `DebunoRPC`,
    version: VER + `${DEV ? `.dev` : ''}`,
    srcKey: 'src',
    genKey: 'gen',
    protocolHandler: {
        protocol: DEV ? 'web+rpcdev' : 'web+rpc',
        url: '/#%s'
    }
} as const