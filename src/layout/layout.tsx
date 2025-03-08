export function Layout({ nav, body }: { nav: string; body: string }) {
  return (
    <div id="page">
      <div id="nav" dangerouslySetInnerHTML={{ __html: nav }}>nav</div>
      <div id="body" dangerouslySetInnerHTML={{ __html: body }}>body</div>
    </div>
  );
}
