import { XURL, type XURLType } from "../xurl.ts";
import * as utils from "@utils"
import * as sse from "@signals/sse.ts"
import { setOrigins, setError, setCode, getOrigins } from "@actions";
import config from "@config";
import { endpoint } from "@signals";

export const xurl = new XURL(location, {
    hash(value, ctx) {
        value = decodeURIComponent(value.slice(1))
        if (value) {
            console.log(`hashchange`, value)
            try {
                ctx.goto(value)
            } catch (e) {
                console.warn(`hashchange/error`, e)
            }
        }
    },
    href(value, xurl) {
        if (xurl.host === "blank" || xurl.host === 'index') {
            document.title = config.name
            return;
        }

        document.title = xurl.host + xurl.pathname + xurl.search

        utils.fetchCode(value)
            .then(res => {
                if (res.endpoint) {
                    endpoint.value = res.endpoint
                    // const _endpoints = endpoints.value
                    // endpoints.value = [...new Set([..._endpoints, res.endpoint])]
                    // console.log(`endpoints: ${endpoints.value}`)

                    localStorage.setItem('origin', res.endpoint)

                    const origins = getOrigins()
                    const exists = !!origins.find(o => o === res.endpoint)
                    if (!exists) {
                        setOrigins([...origins, res.endpoint])
                    }
                }

                return res
            })
            .then(setCode)
            .catch(setError)
            .finally(() => console.log(`\n\t\t\ code @ ${value} OK\n\n`))
    },
    any(prop, value, ctx) {
        // @ts-ignore .
        const prev = (ctx.prev = ctx.prev || {}) as XURLType
        const pValue = prev[prop]
        prev[prop] = value

        switch (prop) {
            case 'href': {
                console.log('%c%s%c%s', 'border-radius:3px;margin-left:1px;background:rgba(0,0,0,0.5); color: rgba(255,255,255,0.7); font-size:10px; padding:3px 5px;font-weight:500;margin-right:10px', prop, 'color: #eee;padding:3px 5px', pValue || "''", '➜ ', value || "''");
                break;
            }
            default:
                console.log('%c%s%c%s', 'border-radius:3px;margin-left:1px;background:rgba(0,0,0,0.2); color: rgba(255,255,255,0.7); font-size:10px; padding:3px 5px;font-weight:500;margin-right:10px', prop, 'color: rgba(255,255,255,0.6);padding:3px 5px', pValue || "''", '➜ ', value || "''");
        }
    }
})

export default xurl

// sse.oevent.subscribe(ev => {
//     if (ev) {
//         const { CLOSED, CONNECTING, OPEN } = ev
//         const state = {
//             OPEN: ev.readyState === OPEN,
//             CLOSED: ev.readyState === CLOSED,
//             CONNECTING: ev.readyState === CONNECTING
//         }
//         console.log(` **** ${ev?.url} ***`, ev?.readyState, state)
//     } else {
//         console.log(` **** ovent undefined ***`)

//     }
// })

Object.assign(globalThis, { utils, goto: xurl.goto, xurl, XURL, sse })