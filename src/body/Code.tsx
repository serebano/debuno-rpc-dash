import CodeBlock from "./CodeBlock.tsx";

export default function Code() {
  const code = `console.log("Hello, world!");`;

  return (
    <div>
      <h1>Code Highlight</h1>
      <CodeBlock code={code} language="javascript" />
    </div>
  );
}
