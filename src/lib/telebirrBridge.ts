// Telebirr's "H5 in-app" payment bridge: when our checkout page is opened inside Telebirr's
// own app webview, the app injects `window.consumerapp`. In that context we don't redirect to
// the hosted paygate URL at all — instead we hand Telebirr's app a signed preOrder request via
// its native JS bridge (`js_fun_start_pay`), and it completes payment natively, calling back
// into `window.handleinitDataCallback` when done. Outside the Telebirr app (a normal browser),
// `window.consumerapp` doesn't exist and callers should fall back to the regular checkoutUrl
// redirect. Mirrors Telebirr's own C2B_WebCheckoutDemo `startPay()` reference implementation.
declare global {
    interface Window {
        consumerapp?: {
            evaluate: (payload: string) => void;
        };
        handleinitDataCallback?: () => void;
    }
}

export function isTelebirrBridgeAvailable(): boolean {
    return typeof window !== "undefined" && typeof window.consumerapp !== "undefined";
}

// `onComplete` runs once Telebirr's app finishes the payment flow and invokes the callback —
// typically a redirect to a return/confirmation page, same purpose as `return_url` in the
// normal checkoutUrl flow.
export function startTelebirrBridgePayment(rawRequest: string, onComplete: () => void): void {
    if (!isTelebirrBridgeAvailable()) {
        throw new Error("Telebirr in-app bridge (window.consumerapp) is not available");
    }

    window.handleinitDataCallback = onComplete;

    window.consumerapp!.evaluate(
        JSON.stringify({
            functionName: "js_fun_start_pay",
            params: {
                rawRequest: rawRequest.trim(),
                functionCallBackName: "handleinitDataCallback",
            },
        })
    );
}
