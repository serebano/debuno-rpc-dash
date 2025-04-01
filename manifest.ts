import config from "@config";
import { writeFile } from "node:fs/promises";

const manifest = {
    "name": config.name,
    "short_name": config.name,
    "description": config.description + ` ${config.version}`,
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
            "protocol": config.protocolHandler.protocol,
            "url": config.protocolHandler.url
        }
    ],
    "launch_handler": {
        "client_mode": "navigate-existing"
    }
}


export const build = async () => await writeFile('./public/manifest.json', JSON.stringify(manifest, null, 4))

if (import.meta.main) {
    await build()
}