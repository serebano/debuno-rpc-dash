import "./app.css";
import Nav from "./nav/Nav.tsx";
// import Body from "./body/body.tsx";
import Editor from "./body/Editor.tsx";

export function App() {
  return (
    <div id="app">
      <Nav />
      <Editor />
    </div>
  );
}
