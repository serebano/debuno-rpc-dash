import { XURL, type XURLType } from "@xurl";
import * as utils from "@utils"
import * as sse from "@signals/sse.ts"
import { setError, setCode, addOrigin } from "@actions";
import config from "@config";
import { addr } from "@signals";

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

        if (['index', 'about'].includes(xurl.host)) {
            document.title = config.name + ' ' + xurl.host
            return
        }

        document.title = xurl.host + xurl.pathname + xurl.search

        xurl.status = 'LOADING'
        addr.host.value = xurl.host

        utils.fetchCode(value)
            .then(res => {


                xurl.status = res.error ? 'ERROR' : 'OK'

                if (res.endpoint) {
                    xurl.base = res.endpoint
                    addr.base.value = xurl.base
                    addr.path.value = xurl.pathname.replace(xurl.base, '')

                    addOrigin(res.endpoint)
                        .map(sse.createEventSource)

                    localStorage.setItem('origin', res.endpoint)
                }

                return res
            })
            .then(setCode)
            .catch(setError)
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