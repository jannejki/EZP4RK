'use strict';

window.onload = () => {
    const registerServiceWorker = async () => {
        if ("serviceWorker" in navigator) {
            try {
                const registration = await navigator.serviceWorker.register("./sw.js", {
                    scope: "/",
                });
                if (registration.installing) {
                    console.log("Service worker installing main.js");
                } else if (registration.waiting) {
                    console.log("Service worker installed main.js");
                } else if (registration.active) {
                    console.log("Service worker active main.js");
                }
            } catch (error) {
                console.error(`Registration failed with ${error}`);
            }
        }
    };

    // …

    registerServiceWorker();
}
