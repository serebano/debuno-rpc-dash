import "./app.css";
import Nav from "./nav/Nav.tsx";
import Editor from "./body/Editor.tsx";
import { AddrBar } from "./addr/AddrBar.tsx";

export function App() {
  return (
    <>
      <AddrBar />
      <div id="app">
        <Nav />
        <Editor />
      </div>
    </>
  );
}
