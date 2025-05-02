import { createHotContext as __vite__createHotContext } from "/@vite/client";import.meta.hot = __vite__createHotContext("/src/main.tsx");        import "/node_modules/.deno/@prefresh+core@1.5.3/node_modules/@prefresh/core/src/index.js?v=7dc414d0";        import { flush as flushUpdates } from "/node_modules/.deno/@prefresh+utils@1.2.0/node_modules/@prefresh/utils/src/index.js?v=7dc414d0";        let prevRefreshReg;        let prevRefreshSig;        if (import.meta.hot) {          prevRefreshReg = self.$RefreshReg$ || (() => {});          prevRefreshSig = self.$RefreshSig$ || (() => (type) => type);          self.$RefreshReg$ = (type, id) => {            self.__PREFRESH__.register(type, "/Users/serebano/dev/debuno-rpc-dash/src/main.tsx" + " " + id);          };          self.$RefreshSig$ = () => {            let status = 'begin';            let savedType;            return (type, key, forceReset, getCustomHooks) => {              if (!savedType) savedType = type;              status = self.__PREFRESH__.sign(type || savedType, key, forceReset, getCustomHooks, status);              return type;            };          };        }        import "/.vite/deps/preact_debug.js?v=7dc414d0";
var _jsxFileName = "/Users/serebano/dev/debuno-rpc-dash/src/main.tsx";
import "/src/sw-register.ts?t=1746165637438";
import { render } from "/.vite/deps/preact.js?v=7dc414d0";
import { App } from "/src/app.tsx?t=1746165637438";
import * as utils from "/src/utils.ts?t=1746165637438";
import { connect } from "/src/connect/connect.ts?t=1746165637438";
import pages from "/src/pages/index.ts?t=1746165637438";
import { AddrBar } from "/src/addr/AddrBar.tsx?t=1746165661355";
import { jsxDEV as _jsxDEV, Fragment as _Fragment } from "/.vite/deps/preact_jsx-dev-runtime.js?v=7dc414d0";
Object.assign(globalThis, {
  utils
});
function Main() {
  const url = connect.url.value;
  const Page = url in pages ? pages[url] : App;
  return _jsxDEV(_Fragment, {
    children: [_jsxDEV(AddrBar, {}, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 17,
      columnNumber: 7
    }, this), _jsxDEV("div", {
      id: "app",
      class: url === "*" ? "reloading" : "reloaded",
      children: _jsxDEV(Page, {}, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 19,
        columnNumber: 9
      }, this)
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 18,
      columnNumber: 7
    }, this)]
  }, void 0, true);
}
_c = Main;
connect.on("*", e => {
  console.debug(`%c${e.target.endpoint.replace("://", ":")}%c on(%c${e.type}%c)`, `color:#ccc;background:#3c3c3c;border-radius:50px;font-size:11px;padding:2.5px 7px;font-family:-apple-system, BlinkMacSystemFont, sans-serif;`, `color:ccc;`, `color:#fe8d59;`, `color:ccc`, e.data ?? "");
});
connect.init();
render(_jsxDEV(Main, {}, void 0, false, {
  fileName: _jsxFileName,
  lineNumber: 41,
  columnNumber: 8
}, void 0), document.querySelector("#rpcapp"));
if (import.meta.hot) {
  import.meta.hot.dispose(() => {
    connect.close();
    connect.dispose();
  });
}
var _c;
$RefreshReg$(_c, "Main");

        if (import.meta.hot) {
          self.$RefreshReg$ = prevRefreshReg;
          self.$RefreshSig$ = prevRefreshSig;
          import.meta.hot.accept((m) => {
            try {
              flushUpdates();
            } catch (e) {
              self.location.reload();
            }
          });
        }
      
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJtYXBwaW5ncyI6IjtBQUFBLElBQUFBLFlBQUEsR0FBTztBQUNQO0FBQ0EsU0FBU0MsY0FBVztBQUNwQixTQUFPQSxHQUFBLFFBQVU7QUFDakIsWUFBU0MsV0FBTztBQUNoQixTQUFPQyxlQUFXO0FBQ2xCLE9BQUFBLEtBQUEsTUFBZ0I7QUFBNkIsU0FBQUMsZUFBQUM7QUFFN0NDLFNBQU9DLFVBQU9DLFNBQVlDLFFBQUEsSUFBQUMsU0FBQTtPQUFFQztFQUFRQTtBQUVwQztTQUNRQyxPQUFNVjtFQUNaLE1BQU1XLE1BQUlYLE9BQUEsQ0FBVUM7RUFFcEIsTUFBQVUsSUFBQSxHQUNFUixPQUFBSyxRQUFBUCxLQUFBLENBQUFTLEdBQUEsSUFBQVgsR0FBQTtTQUFBYSxRQUNFVCxXQUFDVTtJQUFBQSxVQUFPLENBQUFWLE9BQUEsQ0FBQUwsU0FBQTtNQUFBZ0IsVUFBQWhCLFlBQUE7TUFBQWlCLFlBQUE7TUFBQUEsWUFBQSxFQUNSWjtJQUFBQSxHQUFLYSxJQUFHLEdBQUFiLE9BQUEsQ0FBSztNQUFDYztNQUE4Q0wsZUFDMURULE1BQUNRLGNBQUk7TUFBQUMsUUFBQSxFQUFBVCxPQUFBLENBQUFMLE1BQUE7UUFBQWdCLFVBQUFoQixZQUFBO1FBQUFpQixZQUFBO1FBQUFBLFlBQUEsRUFBRTtNQUFDO0lBQUEsR0FBQUcsUUFBQSxPQUFBcEI7TUFBQWdCLFVBQUFoQixZQUFBO01BQUFpQixZQUFBO01BQUFBLFlBQUEsRUFDSjtJQUFBO0VBR1o7QUFFQWY7QUFBQUEsS0FiUVU7UUFjTlMsR0FBUUMsS0FDTkMsQ0FBQSxJQUFLQTtFQU9QRixPQUFBLENBQUFDLEtBQUEsTUFBQUMsQ0FBQSxDQUFBQyxNQUFBLENBQUFDLFFBQUEsQ0FBQUMsT0FBQSx1QkFBQUgsQ0FBQSxDQUFBSSxJQUFBLG9NQUFBSixDQUFBLENBQUFLLElBQUE7QUFFRjFCO0FBQ0FBLE9BQUEsQ0FBQTJCLElBQUE7T0FJWVQsUUFBQXBCLFVBQUE7RUFBQWdCLFVBQUFoQixZQUFBO0VBQUFpQixZQUFBO0VBQUFBLFlBQUEsRUFBS2E7QUFFakIsU0FBSUMsR0FBTUQsUUFBQSxDQUFTRSxhQUFBLENBQUU7SUFDbkJELE1BQUEsQ0FBQUUsSUFBQSxDQUFBQyxHQUFBO2NBR1VDLElBQU1DLE9BQUEsQ0FBQztJQUNmbEMsUUFBUWtDO0lBQ1JsQyxPQUFBLENBQUFrQyxPQUFBO0VBQ0oiLCJuYW1lcyI6WyJfanN4RmlsZU5hbWUiLCJBcHAiLCJjb25uZWN0IiwicGFnZXMiLCJqc3hERVYiLCJfanN4REVWIiwiT2JqZWN0IiwiYXNzaWduIiwiZ2xvYmFsVGhpcyIsIkZyYWdtZW50IiwiX0ZyYWdtZW50IiwidXRpbHMiLCJ1cmwiLCJQYWdlIiwiY2hpbGRyZW4iLCJBZGRyQmFyIiwibGluZU51bWJlciIsImNvbHVtbk51bWJlciIsImlkIiwiY2xhc3MiLCJmaWxlTmFtZSIsImNvbnNvbGUiLCJkZWJ1ZyIsImUiLCJ0YXJnZXQiLCJlbmRwb2ludCIsInJlcGxhY2UiLCJ0eXBlIiwiZGF0YSIsImluaXQiLCJkb2N1bWVudCIsImltcG9ydCIsInF1ZXJ5U2VsZWN0b3IiLCJtZXRhIiwiaG90IiwiY2xvc2UiLCJkaXNwb3NlIl0sImlnbm9yZUxpc3QiOltdLCJzb3VyY2VzIjpbIm1haW4udHN4Il0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBcIi4vc3ctcmVnaXN0ZXIudHNcIjtcbmltcG9ydCB7IHJlbmRlciB9IGZyb20gXCJwcmVhY3RcIjtcbmltcG9ydCB7IEFwcCB9IGZyb20gXCIuL2FwcC50c3hcIjtcbmltcG9ydCAqIGFzIHV0aWxzIGZyb20gXCJAdXRpbHNcIjtcbmltcG9ydCB7IGNvbm5lY3QgfSBmcm9tIFwiQGNvbm5lY3RcIjtcbmltcG9ydCBwYWdlcyBmcm9tIFwiLi9wYWdlcy9pbmRleC50c1wiO1xuaW1wb3J0IHsgQWRkckJhciB9IGZyb20gXCIuL2FkZHIvQWRkckJhci50c3hcIjtcblxuT2JqZWN0LmFzc2lnbihnbG9iYWxUaGlzLCB7IHV0aWxzIH0pO1xuXG5mdW5jdGlvbiBNYWluKCkge1xuICBjb25zdCB1cmwgPSBjb25uZWN0LnVybC52YWx1ZTtcbiAgY29uc3QgUGFnZSA9IHVybCBpbiBwYWdlcyA/IHBhZ2VzW3VybCBhcyBrZXlvZiB0eXBlb2YgcGFnZXNdIDogQXBwO1xuXG4gIHJldHVybiAoXG4gICAgPD5cbiAgICAgIDxBZGRyQmFyIC8+XG4gICAgICA8ZGl2IGlkPVwiYXBwXCIgY2xhc3M9e3VybCA9PT0gXCIqXCIgPyBcInJlbG9hZGluZ1wiIDogXCJyZWxvYWRlZFwifT5cbiAgICAgICAgPFBhZ2UgLz5cbiAgICAgIDwvZGl2PlxuICAgIDwvPlxuICApO1xufVxuXG5jb25uZWN0Lm9uKFwiKlwiLCAoZSkgPT4ge1xuICBjb25zb2xlLmRlYnVnKFxuICAgIGAlYyR7ZS50YXJnZXQuZW5kcG9pbnQucmVwbGFjZShcIjovL1wiLCBcIjpcIil9JWMgb24oJWMke2UudHlwZX0lYylgLFxuICAgIGBjb2xvcjojY2NjO2JhY2tncm91bmQ6IzNjM2MzYztib3JkZXItcmFkaXVzOjUwcHg7Zm9udC1zaXplOjExcHg7cGFkZGluZzoyLjVweCA3cHg7Zm9udC1mYW1pbHk6LWFwcGxlLXN5c3RlbSwgQmxpbmtNYWNTeXN0ZW1Gb250LCBzYW5zLXNlcmlmO2AsXG4gICAgYGNvbG9yOmNjYztgLFxuICAgIGBjb2xvcjojZmU4ZDU5O2AsXG4gICAgYGNvbG9yOmNjY2AsXG4gICAgZS5kYXRhID8/IFwiXCIsXG4gICk7XG59KTtcblxuY29ubmVjdC5pbml0KCk7XG4vLyBpZiAoaW1wb3J0Lm1ldGEuaG90KSB7XG4vLyAgIGF3YWl0IGNvbm5lY3QucmVzdG9yZSgpO1xuLy8gfVxuXG5yZW5kZXIoPE1haW4gLz4sIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjcnBjYXBwXCIpISk7XG5cbmlmIChpbXBvcnQubWV0YS5ob3QpIHtcbiAgLy8gYXdhaXQgY29ubmVjdC5yZXN0b3JlKCk7XG5cbiAgaW1wb3J0Lm1ldGEuaG90LmRpc3Bvc2UoKCkgPT4ge1xuICAgIGNvbm5lY3QuY2xvc2UoKTtcbiAgICBjb25uZWN0LmRpc3Bvc2UoKTtcbiAgfSk7XG59XG4iXSwiZmlsZSI6Ii9Vc2Vycy9zZXJlYmFuby9kZXYvZGVidW5vLXJwYy1kYXNoL3NyYy9tYWluLnRzeCJ9