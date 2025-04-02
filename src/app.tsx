import "./app.css";
import Nav from "./nav/Nav.tsx";
// import Body from "./body/body.tsx";
import Editor from "./body/Editor.tsx";
import { AddrBar } from "./AddrBar2.tsx";
import { xurl } from "@signals";

export default function Header() {
  return <AddrBar value={xurl.href} />;
}

export function App() {
  return (
    <>
      <Header />

      <div id="app">
        <Nav />
        <Editor />
      </div>
    </>
  );
}
