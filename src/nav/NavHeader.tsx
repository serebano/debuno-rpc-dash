import Icon from "../icons/icon.tsx";

const iconProps = {
  size: 22,
  padding: 0,
  strokeWidth: 50,
  stroke: "#21252b",
  bgPadding: 10,
  bgColor: "rgba(0,0,0,0)",
  fill: "rgb(255 255 255 / 40%)",
};

export default function NavHeader() {
  return (
    <div class="nav-header">
      <Icon {...iconProps} />
      <div style={{ flex: "auto" }}></div>
    </div>
  );
}
