import { XURL, type XURLType } from "../xurl.ts";
import * as utils from "@utils"
import * as sse from "@signals/sse.ts"
import origins from "@signals/origins.ts";
import { setOrigins, setError, setCode } from "@actions";

export const xurl = new XURL(location, {
    href(value, xurl) {
        if (xurl.host === "blank") return;
        if (xurl.host === 'index') {
            if (xurl.params.handle) {
                try {
                    const url = new URL(xurl.params.handle)
                    xurl.goto('http://' + url.host + url.pathname + url.search + url.hash)
                    return
                } catch (e: any) {
                    setCode({ code: '/**\n' + e.stack + '\n*/' })
                    return
                }
            }

            setCode({ code: `// Indexxx`, error: null })
            return
        }

        utils.fetchCode(value)
            .then(setCode)
            .catch(setError)
            .finally(() => console.log(`\n\t\t\ code @ ${value} OK\n\n`))
    },
    origin(value, xurl) {
        if (xurl.host === "blank" || xurl.host === 'index')
            return;
        if (origins.value.length === 0)
            setOrigins([value])
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

xurl.compute(x => x.host + x.pathname + x.search)
    .subscribe(title => {
        document.title = title
    })

Object.assign(globalThis, { utils, goto: xurl.goto, xurl, XURL, sse })