import { writeFile } from "node:fs/promises";
import pkg from './deno.json' with {type: 'json'}
import process from "node:process";
// @ts-ignore .
const ENV = process.env.RPC_ENV || 'prod'
const DEV = ENV === 'dev'

const manifest = {
    "name": `${DEV ? ' [DEV] ' : ''}${pkg.displayName}`,
    "short_name": pkg.displayName,
    "description": pkg.description,
    "start_url": "/",
    "id": "/",
    "display": "standalone",
    "background_color": "#21252b",
    "theme_color": "#21252b",
    "icons": [
        {
            "src": "/debuno.svg",
            "sizes": "any",
            "type": "image/svg+xml",
            "purpose": "any"
        }
    ],
    "protocol_handlers": [
        {
            "protocol": DEV ? 'web+rpcdev' : 'web+rpc',
            "url": '/#%s'
        }
    ],
    "launch_handler": {
        "client_mode": "focus-existing"
    }
}


export const build = async () => await writeFile('./public/manifest.json', JSON.stringify(manifest, null, 4))

if (import.meta.main) {
    await build()
}