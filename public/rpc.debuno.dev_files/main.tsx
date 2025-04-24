import { createHotContext as __vite__createHotContext } from "/@vite/client";import.meta.hot = __vite__createHotContext("/src/main.tsx");        import "/node_modules/.deno/@prefresh+core@1.5.3/node_modules/@prefresh/core/src/index.js?v=7dc414d0";        import { flush as flushUpdates } from "/node_modules/.deno/@prefresh+utils@1.2.0/node_modules/@prefresh/utils/src/index.js?v=7dc414d0";        let prevRefreshReg;        let prevRefreshSig;        if (import.meta.hot) {          prevRefreshReg = self.$RefreshReg$ || (() => {});          prevRefreshSig = self.$RefreshSig$ || (() => (type) => type);          self.$RefreshReg$ = (type, id) => {            self.__PREFRESH__.register(type, "/Users/serebano/dev/debuno-rpc-dash/src/main.tsx" + " " + id);          };          self.$RefreshSig$ = () => {            let status = 'begin';            let savedType;            return (type, key, forceReset, getCustomHooks) => {              if (!savedType) savedType = type;              status = self.__PREFRESH__.sign(type || savedType, key, forceReset, getCustomHooks, status);              return type;            };          };        }        import "/.vite/deps/preact_debug.js?v=7dc414d0";
var _jsxFileName = "/Users/serebano/dev/debuno-rpc-dash/src/main.tsx";
import { render } from "/.vite/deps/preact.js?v=7dc414d0";
import "/src/sw-register.ts?t=1745483007665";
import { App } from "/src/app.tsx?t=1745493879700";
import { Index } from "/src/index/Index.tsx?t=1745483007665";
import { About } from "/src/about.tsx?t=1745406598123";
import * as signals from "/src/signals.ts?t=1745493444054";
import * as actions from "/src/actions.ts?t=1745493444054";
import * as utils from "/src/utils.ts?t=1745493444054";
import { connect } from "/src/connect/connect.ts?t=1745483007665";
import { jsxDEV as _jsxDEV } from "/.vite/deps/preact_jsx-dev-runtime.js?v=7dc414d0";
Object.assign(globalThis, {
  utils,
  signals,
  actions
});
function Main() {
  switch (connect.url.value) {
    case "":
      return _jsxDEV(Index, {}, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 16,
        columnNumber: 14
      }, this);
    case "about":
      return _jsxDEV(About, {}, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 18,
        columnNumber: 14
      }, this);
    default:
      return _jsxDEV(App, {}, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 20,
        columnNumber: 14
      }, this);
  }
}
_c = Main;
connect.on("*", e => {
  console.debug(`%c${e.target.endpoint.replace("://", ":")}%c on(%c${e.type}%c)`, `color:#ccc;background:#3c3c3c;border-radius:50px;font-size:11px;padding:2.5px 7px;font-family:-apple-system, BlinkMacSystemFont, sans-serif;`, `color:ccc;`, `color:#fe8d59;`, `color:ccc`, e.data ?? "");
});
connect.init();
if (import.meta.hot) {
  await connect.restore();
}
render(_jsxDEV(Main, {}, void 0, false, {
  fileName: _jsxFileName,
  lineNumber: 40,
  columnNumber: 8
}, void 0), document.body);
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
      
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJtYXBwaW5ncyI6IjtBQUFBLElBQUFBLFlBQUEsR0FBZTtBQUNmLFNBQU9DLE1BQUE7QUFDUDtBQUNBLFNBQVNDLFdBQUs7QUFDZCxTQUFTQyxhQUFhO0FBQ3RCLFNBQU9BLEtBQUEsUUFBWTtBQUNuQixZQUFZQyxhQUFhO0FBQ3pCLFlBQVlDLGFBQVc7QUFDdkIsWUFBU0MsV0FBTztBQUFtQixTQUFBQyxlQUFBQztBQUVuQ0MsU0FBT0MsVUFBT0MsZUFBWTtPQUFPRCxNQUFBLENBQUFDLFVBQUE7RUFBRUM7RUFBU1I7RUFBVUE7QUFFdEQ7U0FDRVMsS0FBQSxFQUFRUDtVQUNEQSxPQUFBLENBQUVRLEdBQUEsQ0FBQUMsS0FBQTtJQUFBLEtBQ0w7YUFBYUMsUUFBQWhCLFdBQUE7UUFBQWlCLFVBQUFqQixZQUFBO1FBQUFrQixZQUFBO1FBQUFBLFlBQUEsRUFBRztNQUNsQixHQUFLO0lBQUEsS0FDSDthQUFhRixRQUFBaEIsV0FBQTtRQUFBaUIsVUFBQWpCLFlBQUE7UUFBQWtCLFlBQUE7UUFBQUEsWUFBQSxFQUFHO01BQ2xCO0lBQUE7YUFDYUYsUUFBQWhCLFNBQUE7UUFBQWlCLFVBQUFqQixZQUFBO1FBQUFrQixZQUFBO1FBQUFBLFlBQUEsRUFBRztNQUNsQjtFQUNGO0FBRUFaO0FBQUFBLEtBVkVPLElBQUE7UUFXQU0sR0FBUUMsS0FDTkMsQ0FBQSxJQUFLQTtFQU9QRixPQUFBLENBQUFDLEtBQUEsTUFBQUMsQ0FBQSxDQUFBQyxNQUFBLENBQUFDLFFBQUEsQ0FBQUMsT0FBQSx1QkFBQUgsQ0FBQSxDQUFBSSxJQUFBLG9NQUFBSixDQUFBLENBQUFLLElBQUE7QUFFRnBCO0FBQ0FBLE9BQUEsQ0FBSXFCLEtBQU9DO0lBQ1RELE1BQUEsQ0FBQUMsSUFBQSxDQUFjQztFQUNoQixNQUFBdkIsT0FBQSxDQUFBdUIsT0FBQTtBQUVBNUI7T0FBWWUsUUFBQWhCLFVBQUE7RUFBQWlCLFVBQUFqQixZQUFBO0VBQUFrQixZQUFBO0VBQUFBLFlBQUEsRUFBS1k7QUFFakIsU0FBSUgsR0FBTUcsUUFBQSxDQUFTQyxJQUFFO0lBQ25CSixZQUFZSyxLQUFJQztjQUNOQyxJQUFNRCxPQUFBLENBQUM7SUFDZjNCLFFBQVEyQjtJQUNSM0IsT0FBQSxDQUFBMkIsT0FBQTtFQUNKIiwibmFtZXMiOlsiX2pzeEZpbGVOYW1lIiwicmVuZGVyIiwiSW5kZXgiLCJBYm91dCIsImFjdGlvbnMiLCJ1dGlscyIsImNvbm5lY3QiLCJqc3hERVYiLCJfanN4REVWIiwiT2JqZWN0IiwiYXNzaWduIiwiZ2xvYmFsVGhpcyIsInNpZ25hbHMiLCJNYWluIiwidXJsIiwidmFsdWUiLCJmaWxlTmFtZSIsImxpbmVOdW1iZXIiLCJjb2x1bW5OdW1iZXIiLCJjb25zb2xlIiwiZGVidWciLCJlIiwidGFyZ2V0IiwiZW5kcG9pbnQiLCJyZXBsYWNlIiwidHlwZSIsImRhdGEiLCJpbXBvcnQiLCJtZXRhIiwicmVzdG9yZSIsImRvY3VtZW50IiwiYm9keSIsImhvdCIsImRpc3Bvc2UiLCJjbG9zZSJdLCJpZ25vcmVMaXN0IjpbXSwic291cmNlcyI6WyJtYWluLnRzeCJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyByZW5kZXIgfSBmcm9tIFwicHJlYWN0XCI7XG5pbXBvcnQgXCIuL3N3LXJlZ2lzdGVyLnRzXCI7XG5pbXBvcnQgeyBBcHAgfSBmcm9tIFwiLi9hcHAudHN4XCI7XG5pbXBvcnQgeyBJbmRleCB9IGZyb20gXCIuL2luZGV4L0luZGV4LnRzeFwiO1xuaW1wb3J0IHsgQWJvdXQgfSBmcm9tIFwiLi9hYm91dC50c3hcIjtcbmltcG9ydCAqIGFzIHNpZ25hbHMgZnJvbSBcIkBzaWduYWxzXCI7XG5pbXBvcnQgKiBhcyBhY3Rpb25zIGZyb20gXCJAYWN0aW9uc1wiO1xuaW1wb3J0ICogYXMgdXRpbHMgZnJvbSBcIkB1dGlsc1wiO1xuaW1wb3J0IHsgY29ubmVjdCB9IGZyb20gXCJAY29ubmVjdFwiO1xuXG5PYmplY3QuYXNzaWduKGdsb2JhbFRoaXMsIHsgdXRpbHMsIHNpZ25hbHMsIGFjdGlvbnMgfSk7XG5cbmZ1bmN0aW9uIE1haW4oKSB7XG4gIHN3aXRjaCAoY29ubmVjdC51cmwudmFsdWUpIHtcbiAgICBjYXNlIFwiXCI6XG4gICAgICByZXR1cm4gPEluZGV4IC8+O1xuICAgIGNhc2UgXCJhYm91dFwiOlxuICAgICAgcmV0dXJuIDxBYm91dCAvPjtcbiAgICBkZWZhdWx0OlxuICAgICAgcmV0dXJuIDxBcHAgLz47XG4gIH1cbn1cblxuY29ubmVjdC5vbihcIipcIiwgKGUpID0+IHtcbiAgY29uc29sZS5kZWJ1ZyhcbiAgICBgJWMke2UudGFyZ2V0LmVuZHBvaW50LnJlcGxhY2UoXCI6Ly9cIiwgXCI6XCIpfSVjIG9uKCVjJHtlLnR5cGV9JWMpYCxcbiAgICBgY29sb3I6I2NjYztiYWNrZ3JvdW5kOiMzYzNjM2M7Ym9yZGVyLXJhZGl1czo1MHB4O2ZvbnQtc2l6ZToxMXB4O3BhZGRpbmc6Mi41cHggN3B4O2ZvbnQtZmFtaWx5Oi1hcHBsZS1zeXN0ZW0sIEJsaW5rTWFjU3lzdGVtRm9udCwgc2Fucy1zZXJpZjtgLFxuICAgIGBjb2xvcjpjY2M7YCxcbiAgICBgY29sb3I6I2ZlOGQ1OTtgLFxuICAgIGBjb2xvcjpjY2NgLFxuICAgIGUuZGF0YSA/PyBcIlwiLFxuICApO1xufSk7XG5cbmNvbm5lY3QuaW5pdCgpO1xuaWYgKGltcG9ydC5tZXRhLmhvdCkge1xuICBhd2FpdCBjb25uZWN0LnJlc3RvcmUoKTtcbn1cblxucmVuZGVyKDxNYWluIC8+LCBkb2N1bWVudC5ib2R5KTtcblxuaWYgKGltcG9ydC5tZXRhLmhvdCkge1xuICBpbXBvcnQubWV0YS5ob3QuZGlzcG9zZSgoKSA9PiB7XG4gICAgY29ubmVjdC5jbG9zZSgpO1xuICAgIGNvbm5lY3QuZGlzcG9zZSgpO1xuICB9KTtcbn1cbiJdLCJmaWxlIjoiL1VzZXJzL3NlcmViYW5vL2Rldi9kZWJ1bm8tcnBjLWRhc2gvc3JjL21haW4udHN4In0=