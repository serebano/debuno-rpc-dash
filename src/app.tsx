import "./app.css";
import SideNav from "./nav/SideNav.tsx";
import Body from "./body/body.tsx";

export function App() {
  return (
    <div id="app">
      <SideNav />
      <Body />
    </div>
  );
}
