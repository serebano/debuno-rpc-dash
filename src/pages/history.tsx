import { computed } from "@preact/signals";
import { connect, RPCClient } from "@connect";

const history = computed(() => {
  return connect.history.value.map((endpoint) => {
    const readyState = connect.instances.value.find((i) =>
      i.endpoint === endpoint
    )?.readyState;
    return {
      endpoint,
      state: typeof readyState === "undefined"
        ? RPCClient.STATE[RPCClient.CLOSED]
        : RPCClient.STATE[readyState],
    };
  });
});

function History() {
  const lastUrl = localStorage.getItem("rpc:url");
  const isEmpty = !lastUrl && !history.value.length;
  return (
    <div style="padding:15%;font-size:14px;">
      {isEmpty ? <h2>Still no entries</h2> : <h2>Recents</h2>}
      <ul>
        {history.value.map(({ endpoint, state }) => (
          <li key={endpoint}>
            <a href={`#${endpoint}`}>{endpoint}</a> [{state}]
          </li>
        ))}
        {lastUrl
          ? (
            <li key="lasturl">
              <a href={`#${lastUrl}`}>
                {lastUrl}
              </a>
            </li>
          )
          : null}
      </ul>
      {
        /* <button
        type="button"
        onClick={() => connect.restore(true)}
      >
        Restore
      </button> */
      }
    </div>
  );
}

export { History };
