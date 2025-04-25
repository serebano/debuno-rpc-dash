import { connect } from "@connect";

registerServiceWorker();

export function registerServiceWorker() {
    if ("serviceWorker" in navigator) {
        navigator.serviceWorker.register("/sw.js").then((registration) => {
            console.log("Service Worker registered:", registration);

            // Check for updates periodically (every 1 hour)
            setInterval(() => {
                registration.update();
            }, 100 * 1000);

            // Detect a new service worker waiting
            registration.addEventListener("updatefound", () => {
                const newWorker = registration.installing;
                if (newWorker) {
                    newWorker.addEventListener("statechange", () => {
                        if (newWorker.state === "installed" && navigator.serviceWorker.controller) {
                            showUpdateNotification();
                        }
                    });
                }
            });
        }).catch((error) => {
            console.error("Service Worker registration failed:", error);
        });

        navigator.serviceWorker.addEventListener("controllerchange", () => {
            console.log("Service worker changed. Reloading page...");
            window.location.reload();
        });
    }


    if ("launchQueue" in window) {
        // @ts-ignore .
        window.launchQueue.setConsumer(async launchParams => {
            if (launchParams.targetURL) {
                const url = new URL(launchParams.targetURL);
                const uri = decodeURIComponent(url.hash.slice(1))
                if (uri) {
                    const nUri = uri.split('://').pop()!
                    try {
                        await connect.open()
                    } catch { }
                    console.log(`   [launchQueue] ${nUri}`);
                    if (decodeURIComponent(location.hash.slice(1)) === nUri)
                        try { await connect(nUri).ready } catch { }
                    else
                        location.hash = nUri
                }
            }
        });
    } else {
        console.log(`          [launchQueue] not supported `)
    }
}

function showUpdateNotification() {
    const updateBanner = document.createElement("div");
    updateBanner.innerHTML = `
      <div id="update-banner" style="z-index:99999; position: fixed; bottom: 0; width: 100%; background: #000; color: #fff; padding: 10px; text-align: center;">
        New update available! <button id="refresh-btn" style="margin-left: 10px;">Update</button>
      </div>
    `;
    document.body.appendChild(updateBanner);

    document.getElementById("refresh-btn")?.addEventListener("click", async () => {
        const registration = await navigator.serviceWorker.getRegistration();

        if (registration?.waiting) {
            console.log("Waiting SW state before update:", registration.waiting.state);
            if (registration.waiting.state === 'installed') {
                window.location.reload();

            }
            registration.waiting.postMessage({ type: "SKIP_WAITING" });

            registration.waiting.addEventListener("statechange", () => {
                console.log("New SW state after update:", registration.waiting?.state);
                if (registration.waiting?.state === "activated") {
                    console.log("New service worker is activated. Reloading...");
                    window.location.reload();
                }
            });
        } else {
            console.warn("No waiting service worker found.");
        }
    });

    // Reload when a new service worker takes control
    navigator.serviceWorker.addEventListener("controllerchange", () => {
        console.log("Service worker changed. Reloading page...");
        window.location.reload();
    });
}