export default {
    srcKey: 'src' as const,
    outKey: 'out' as const,
    get protocol() {
        return `web+rpc`
    },
}