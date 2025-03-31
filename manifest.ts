import config from "@config";
import { writeFile } from "node:fs/promises";

const manifest = {
    "name": config.name,
    "short_name": config.name,
    "description": config.description,
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

await writeFile('./public/manifest.json', JSON.stringify(manifest, null, 4))